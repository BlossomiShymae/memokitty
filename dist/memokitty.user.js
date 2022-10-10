// ==UserScript==
// @name         memokitty
// @version      0.1.0
// @description  Have templates for issues, pull requests, and more ready to go!
// @author       MissUwuieTime
// @updateURL    https://github.com/MissUwuieTime/memokitty/raw/main/dist/memokitty.user.js
// @downloadURL  https://github.com/MissUwuieTime/memokitty/raw/main/dist/memokitty.user.js
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://unpkg.com/mithril/mithril.js
// @require      https://unpkg.com/jss/dist/jss.min.js
// @require      https://unpkg.com/jss-preset-default/dist/jss-preset-default.min.js
// ==/UserScript==

/**
 * Represents a JSS stylesheet of our userscript application.
 */
const Styles = {
  "@global": {
    body: {
      position: "relative",
    },
    memokitty: {
      position: "relative",
    },
    ".memokitty-settings": {
      visibility: "hidden",
    },
    ".memokitty-controls": {
      position: "sticky",
      bottom: "0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "all",
      pointerEvents: "auto",
    },
  },
};

/**
 * Repesents the controller that manages the webpage document.
 */
class DocumentController {
  constructor() {}

  /**
   * Setup the root of our userscript application.
   * @param {Object} ctx
   * @param {string} ctx.id
   */
  initializeRootNode = (ctx) => {
    const root = document.createElement(ctx.id);
    document.body.appendChild(root);

    return root;
  };

  /**
   * Setup the stylesheet of our userscript application.
   * @param {Object} ctx
   * @param {Object} ctx.styles
   */
  initializeCSS = (ctx) => {
    const _jss = jss.default;
    const _preset = jssPresetDefault.default;

    _jss.setup(_preset());
    const { classes } = _jss.createStyleSheet(ctx.styles).attach();

    return classes;
  };
}


class ApplicationService {
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

const useTemplateFactory = (type) => {
  let template = "";
  let title = "";

  if (type === "feature-request") {
    template = `\
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
            `;
    title = `Add \[feature\]`;
  }

  if (type === "bug-report") {
    template = `\
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Install the lib
2. Using the \`...\` class
3. Scroll down to '....'
4. See an error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Error**
Use \`.catch()\` to catch promise rejections or \`try...catch\` to catch any errors and paste the stack trace below

\`\`\`
// Error stack trace here
\`\`\`

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. Windows 11]
 - Node.JS version [e.g. 16.x]
 - Library version [e.g. 1.0.1]
- Typescript version [e.g. 4.6.4]

**Additional context**
Would be best to include a code snippet here to help reproduce the bug quickly.


\`\`\`ts
// Code snippet that caused the error
\`\`\``;
    title = `\[BUG\] `;
  }

  if (type === "pull-request") {
    template = `\
### Changes
* Add \`sprite\` property to \`Champion\` structure that contains sprite information of a champion.
* Add new Jest test \`Check champion sprite\`.

Attempt to add feature request #32 for sprite information of a champion. This contains needed information goodies such as sprite image url, coordinates, and sizes. :3
`;
    title = `Add \[commits\]`;
  }

  const textarea = document.getElementById("issue_body");
  const titleinput = document.getElementById("issue_title");
  textarea.value = template;
  titleinput.value = title;
};


(function () {
  "use strict";

  const app = new ApplicationService();
  app.execute();
})();

