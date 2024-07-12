import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (

    <div className="sweet-loading">

      <ClipLoader

        color='#000'
        loading={loading}
        css=''
        size={40}

      />
    </div>
  )
}
export default Loader;