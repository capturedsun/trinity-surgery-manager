import WorkspaceButton from "./WorkspaceButton.js"

css(`
    sidebar- {
        width: 288px;
        height: 100vh; 
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center; 
        flex-direction: row;
        border-right: 0.5px solid rgb(155, 155, 155);
        padding-top: 15px;
    }
`)

export default class Sidebar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.append(
            new WorkspaceButton()
        )
    }
}

customElements.define("sidebar-", Sidebar)