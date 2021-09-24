const runAndNavigate = ({func, ...rest}) => {
    console.log("rest", rest.nextScreen)
    console.log("function", func)
    if (func !== null) {
      console.log('running function now')
      func(rest)
    }
    if (rest.nextScreen != null) {
      rest.navigation.navigate(rest.nextScreen)
    }
}

export {
    runAndNavigate
};