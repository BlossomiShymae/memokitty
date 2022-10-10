import { ApplicationService } from "./service/application-service";

(function () {
  "use strict";

  const app = new ApplicationService();
  app.execute();
})();
