// CLASSES

class BaseScreen {
    // Static
    
    static ACTIVE
    
    // Non-static

    constructor(id) {
        // Header
        this.headerNode = document.createElement('header')
        this.headerNode.textContent = "PaintWall"
        // Main
        this.mainNode = document.createElement('main')
        // Footer
        this.footerNode = document.createElement('footer')
        this.footerNode.textContent = '© 2022 University of Applied Sciences Upper Austria, School of Engineering, CPA2IL'
        // Root
        this.rootNode = document.createElement('div')
        this.rootNode.id = id
        this.rootNode.className = 'screen'
        this.rootNode.appendChild(this.headerNode)
        this.rootNode.appendChild(this.mainNode)
        this.rootNode.appendChild(this.footerNode)
        // Body
        document.body.appendChild(this.rootNode)
    }
    show() {
        // Hide previous active screen
        if (BaseScreen.ACTIVE) {
            BaseScreen.ACTIVE.hide()
        }
        // Update active screen
        BaseScreen.ACTIVE = this
        // Show own screen
        this.rootNode.style.display = 'block'
    }
    hide() {
        // Hide own screen
        this.rootNode.style.display = 'none'
    }
}