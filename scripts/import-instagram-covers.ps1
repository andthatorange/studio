$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$postsJson = node -e "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');console.log(JSON.stringify(new Function(s.replace(/export const /g,'const ')+';return instagram.posts;')()))" (Join-Path $projectRoot 'lib\content.js')
if ($LASTEXITCODE -ne 0) { throw 'Could not read Instagram posts' }
$posts = $postsJson | ConvertFrom-Json
$folder = Join-Path $projectRoot 'public\instagram'
New-Item -ItemType Directory -Path $folder -Force | Out-Null
$manifest = @()
$index = 0
foreach ($entry in $posts) {
  $index++
  $post = if ($entry -is [string]) { [PSCustomObject]@{ id = "post-$index"; url = $entry } } else { $entry }
  if ($post.image -and (Test-Path -LiteralPath (Join-Path "$projectRoot\public" $post.image.TrimStart('/')))) { continue }
  try {
    $uri = [uri]$post.url
    if ($uri.Scheme -ne 'https' -or $uri.Host -notin @('instagram.com', 'www.instagram.com') -or $uri.AbsolutePath -notmatch '^/(p|reel|tv)/[A-Za-z0-9_-]+/?$') { throw 'Not a valid Instagram post link' }
    $r = Invoke-WebRequest -Uri $post.url -UseBasicParsing -TimeoutSec 20 -Headers @{ 'User-Agent' = 'facebookexternalhit/1.1' }
    $match = [regex]::Match($r.Content, '<meta[^>]+property=["'']og:image["''][^>]+content=["'']([^"'']+)')
    if (-not $match.Success) { throw 'Instagram did not expose a cover image; add a local image manually for this post' }
    $imageUrl = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
    $imageHost = ([uri]$imageUrl).Host
    if (-not ($imageHost.EndsWith('.cdninstagram.com') -or $imageHost.EndsWith('.fbcdn.net'))) { throw 'Unexpected image host' }
    $id = if ($post.id) { $post.id -replace '[^A-Za-z0-9_-]', '' } else { "post-$index" }
    $destination = Join-Path $folder "$id.jpg"
    Invoke-WebRequest -Uri $imageUrl -UseBasicParsing -TimeoutSec 25 -OutFile $destination
    if ((Get-Item -LiteralPath $destination).Length -lt 1000) { throw 'Image download was incomplete' }
    $manifest += @{ id = $post.id; url = $post.url; image = "/instagram/$id.jpg" }
    Write-Output "Saved cover for $($post.url)"
  } catch { Write-Warning "$($post.url): $($_.Exception.Message)" }
}
$manifestFile = Join-Path ([System.IO.Path]::GetTempPath()) "studio-instagram-$([guid]::NewGuid().ToString('N')).json"
ConvertTo-Json -InputObject @($manifest) | Set-Content -LiteralPath $manifestFile -Encoding utf8
node (Join-Path $PSScriptRoot 'update-instagram-covers.cjs') $projectRoot $manifestFile
if ($LASTEXITCODE -ne 0) { throw 'Could not update post image paths' }
