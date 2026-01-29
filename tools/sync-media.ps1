\
param(
  [Parameter(Mandatory=$true)]
  [string]$Bucket
)

# Usage:
#   powershell -ExecutionPolicy Bypass -File tools/sync-media.ps1 -Bucket <R2_BUCKET_NAME>
#
# Requirements:
#   - Node + wrangler installed: npm i -g wrangler
#   - wrangler login done: wrangler login

$SrcDir = "media-src"
if (!(Test-Path $SrcDir)) {
  Write-Error "ERROR: $SrcDir not found."
  exit 1
}

Write-Host "Uploading $SrcDir -> R2 bucket: $Bucket"
Write-Host "----------------------------------------"

Get-ChildItem -Path $SrcDir -Recurse -File | ForEach-Object {
  $full = $_.FullName
  $rel = $full.Substring((Resolve-Path $SrcDir).Path.Length + 1).Replace("\", "/")

  if ($rel -eq "README.md") { return }

  $key = $rel
  Write-Host "PUT $key"
  wrangler r2 object put "$Bucket/$key" --file "$full" | Out-Null
}

Write-Host "Done."
