css(`
    workspace-button {
        width: 85%;
        height: 43px;
        display: flex;
        gap: 8px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        transition: background .2s;
        font-size: 0.875rem;
    }

    workspace-button:hover {
        cursor: pointer;
        background: rgba(209, 250, 229, 0.3)
    }
`)

export default class WorkspaceButton extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.append(
            img("_/icon.png", 22, 22),
            span("Trinity Orthopedics"),
            span("Free")
                .color("rgb(6 95 70)")
                .scale(0.85)
                .padding('4px')
                .border("0.5px solid rgb(200, 200, 200)")
                .background("rgb(209 250 229)")
                .borderRadius("9px"),
            html(`<svg className="opacity-50 relative ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6.5L8.5 4L11 6.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 9.5L8.5 12L6 9.5" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>`)
        )
    }
}

customElements.define("workspace-button", WorkspaceButton)