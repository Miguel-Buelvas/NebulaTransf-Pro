# make-icon.ps1 — Genera build/icon.ico desde build/icon-blue.png (Electron + Windows)
Add-Type -AssemblyName System.Drawing

# Ruta del PNG original
$sourcePng = Join-Path $PSScriptRoot "build\icon-blue.png"

# Verificar que existe
if (!(Test-Path $sourcePng)) {
    Write-Host "❌ No se encontró build/icon-blue.png" -ForegroundColor Red
    exit 1
}

# Cargar la imagen original
try {
    $original = [System.Drawing.Image]::FromFile($sourcePng)
}
catch {
    Write-Host "❌ Error al cargar build/icon-blue.png" -ForegroundColor Red
    exit 1
}

# Tamaños correctos para Windows / Electron
$sizes = @(16, 32, 48, 64, 128, 256)

# Salida correcta
$outputIco = Join-Path $PSScriptRoot "build\icon.ico"

# Carpeta temporal
$tempDir = Join-Path $env:TEMP "nebula-icons"
New-Item -ItemType Directory -Path $tempDir -ErrorAction SilentlyContinue | Out-Null

try {
    $icons = @()

    foreach ($size in $sizes) {
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $g = [System.Drawing.Graphics]::FromImage($bitmap)
        $g.Clear([System.Drawing.Color]::Transparent)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($original, 0, 0, $size, $size)
        $g.Dispose()

        $tempPng = Join-Path $tempDir "$size.png"
        $bitmap.Save($tempPng, [System.Drawing.Imaging.ImageFormat]::Png)
        $bitmap.Dispose()

        $icons += $tempPng
    }

    # Crear ICO multi-tamaño
    $icoStream = New-Object System.IO.MemoryStream
    $writer = New-Object System.IO.BinaryWriter($icoStream)

    # Encabezado ICO
    $writer.Write([byte[]](0, 0, 1, 0))
    $writer.Write([uint16]$icons.Count)

    $offset = 6 + ($icons.Count * 16)

    foreach ($pngFile in $icons) {
        $bytes = [System.IO.File]::ReadAllBytes($pngFile)
        $img = [System.Drawing.Image]::FromFile($pngFile)

        $w = if ($img.Width -eq 256) { 0 } else { $img.Width }
        $h = if ($img.Height -eq 256) { 0 } else { $img.Height }

        $writer.Write([byte]$w)
        $writer.Write([byte]$h)
        $writer.Write([byte]0)
        $writer.Write([byte]0)
        $writer.Write([uint16]1)
        $writer.Write([uint16]32)
        $writer.Write([int32]$bytes.Length)
        $writer.Write([int32]$offset)

        $offset += $bytes.Length
        $img.Dispose()
    }

    foreach ($pngFile in $icons) {
        $writer.Write([System.IO.File]::ReadAllBytes($pngFile))
    }

    $writer.Flush()
    [System.IO.File]::WriteAllBytes($outputIco, $icoStream.ToArray())

    Write-Host "✅ icon.ico generado correctamente en build/icon.ico" -ForegroundColor Green

}
catch {
    Write-Host "❌ Error generando icon.ico: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
