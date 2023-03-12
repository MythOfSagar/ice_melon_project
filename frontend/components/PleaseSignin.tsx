import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const PleaseSignin = () => {

  return (
    <Link href='/signin'>
      <Image
        title='Click to Sign In'
        alt={"Sign In"}
        src={"https://i.ibb.co/6tCY2V0/CIMG.png"}
        width={850}
        height={200}
      />
    </Link>
  )
}

export default PleaseSignin