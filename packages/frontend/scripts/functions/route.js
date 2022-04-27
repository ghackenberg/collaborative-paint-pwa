function route() {
    socket && socket.close()

    if (location.hash.startsWith('#browse')) {

        browseNode.style.display = 'block'
        paintNode.style.display = 'none'

        // TODO

    } else if (location.hash.startsWith('#paint')) {

        browseNode.style.display = 'none'
        paintNode.style.display = 'block'

        initialize()
        connect()
        draw()

    } else {

        location.hash = '#browse'

    }
}