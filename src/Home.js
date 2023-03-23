import React, { UseState, useEffect } from "react";
import {Link} from 'react-router-dom'


export default function Home() {
return (
<div>
Your favorite food delivered while coding
<Link id="order-pizza" to="/pizza">
  <button>Pizza?
  </button>
</Link>
</div>
)
}