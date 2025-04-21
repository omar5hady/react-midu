import { BUTTONS, EVENTS } from "./consts"

const navigate = (href) => {
  window.history.pushState( {}, '', href)
  //crear un evento personalizado para avisar que se ha navegado
  const navigateEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigateEvent)
}

export const Link = ({target, to, ...props}) => {
    const handleClick = (event) => {
      

      const isMainEvent = event.button === BUTTONS.PRIMARY // Primary Click
      const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey //Verificar si el boton esta modificado 
      const isManagableEvent = target === undefined || target === '_self'
      
      if(isMainEvent && isManagableEvent && !isModifiedEvent){
        event.preventDefault();
        navigate(to)  //Navegacion por SPA
      }


    }

    return <a onClick={handleClick} href={to} target={target} {...props} />

}