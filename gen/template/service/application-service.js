import { DocumentController } from "../controller";
import { useTemplateFactory } from "../util";

export class ApplicationService {
  constructor() {
    this._documentController = new DocumentController();
    this._id = "memokitty";
    this._paths = ["/issues/new"];
    this._rootNode = null;
  }

  _isInPaths = (paths) => {
    let isPathPresent = false;
    for (const path of paths) {
      if (window.location.href.includes(path)) {
        isPathPresent = true;
        break;
      }
    }

    return isPathPresent;
  };

  _render = () => {
    this._rootNode = this._documentController.initializeRootNode({
      id: this._id,
    });
    m.render(
      this._rootNode,
      m("div", [
        m("div", { class: "memokitty-settings" }, [m("div", "test")]),
        m("div", { class: "memokitty-controls" }, [
          m(
            "button",
            {
              class: "btn btn-sm mx-1",
              onclick: () => useTemplateFactory("feature-request"),
            },
            "📃 Issue | Feature"
          ),
          m(
            "button",
            {
              class: "btn btn-sm mx-1",
              onclick: () => useTemplateFactory("bug-report"),
            },
            "📃 Issue | Bug Report"
          ),
          m(
            "button",
            {
              class: "btn btn-sm mx-1",
              onclick: () => useTemplateFactory("pull-request"),
            },
            "📃 Pull Request"
          ),
          m("button", { class: "btn btn-sm mx-1" }, "⚙️ memokitty Settings"),
        ]),
      ])
    );
  };

  execute = () => {
    const classes = this._documentController.initializeCSS({ styles: Styles });

    if (this._isInPaths(this._paths)) this._render();

    let lock = false;
    const observer = new MutationObserver((mutations) => {
      if (!document.body.contains(this._rootNode)) {
        if (!lock) {
          if (this._isInPaths(this._paths)) {
            lock = true;
            setTimeout(() => {
              this._render();
              lock = false;
            }, 500);
          }
        }
      } else {
        if (!this._isInPaths(this._paths))
          this._rootNode.style.visibility = "hidden";
        else this._rootNode.style.visibility = "show";
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  };
}
