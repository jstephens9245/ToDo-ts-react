const getDomain = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:3000/";
    }
  };

  export default getDomain;