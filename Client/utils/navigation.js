const runAndNavigate = ({func, ...rest}) => {
    if (func !== null) {
      func(rest)
    }
    if (rest.nextScreen != null) {
      if (rest.route_params != null) {
        rest.navigation.navigate(rest.nextScreen, {screen: rest.nextScreen, params: rest.route_params})
      } else {
        rest.navigation.navigate(rest.nextScreen)
      }
      
    }
}

export {
    runAndNavigate
};