import { Children, useEffect, useState } from "react";
import { EVENTS } from "./consts";
import { match } from "path-to-regexp";

export const Router = ({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route/> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    // hemos usado path-to-regexp
    // para poder detectar rutas dinamicas como por ejemplo
    // /search/:query <- :query es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    /*
        Guardar los parametros de la url que eran dinamicaos
        y que hemos extraido con path-to-regexp
        por ejemplo, si la ura es /search/:query
        y la url es /search/javascript
        matched.params.query === 'javascript'
    */
    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
};
