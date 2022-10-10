/**
 * Repesents the controller that manages the webpage document.
 */
export class DocumentController {
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
