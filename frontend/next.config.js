/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    //https://i.ibb.co/jWTQB1f/IMG-20230219-012652.jpg
 remotePatterns:[
  {protocol:'https',
  hostname:'i.ibb.co',
  port:'',
  pathname:'/**/**'
}

 ]
},
  reactStrictMode: true,
}

module.exports = nextConfig
