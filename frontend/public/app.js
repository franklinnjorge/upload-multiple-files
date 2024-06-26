
let bytesAmount = 0

const formatBytes = (bytes, decimals = 2) => {
    if(bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    )
}

const updateStatus = (size) => {
    const text = `Pending Bytes to Upload: <strong>${formatBytes(size)}</strong>`
    document.getElementById("size").innerHTML = text
}

const showSize = () => {
    const {files: fileElements} = document.getElementById('file')
    if(!fileElements.length) return;

    const files = Array.from(fileElements)
    const { size } = files
        .reduce((prev, next) => ({size: prev.size + next.size}), {size: 0})

    bytesAmount = size
    updateStatus(size)

    const interval = setInterval(() => {
        console.count()
        const result = bytesAmount - 5e6
        bytesAmount = result < 0 ? 0 : result
        updateStatus(bytesAmount)
        if(bytesAmount === 0) clearInterval(interval)
    })
}

const onload = () => {
    console.log('loaded!')
}

window.showSize = showSize
window.onload = onload