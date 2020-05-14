<a href="https://blog.logesht.dev" target="_blank">
<img src="https://logesht.dev/img/blog_image.png" alt="Logesh Thulasiraman Writes!" />
</a>

<br/>

# Logesh Thulasiraman Writes! (My Tech Digests Blog)

This was blog was built using gatsby, you can clone this and make your blog up and running in a couple of minutes.

### Getting Started

##### `git clone`:

```sh
git clone https://github.com/tlogesh/MyBlog.git 

cd MyBlog

yarn install
```

### Develop & Build

Once installed or cloned locally and all packages are installed you can begin developing your site.

```sh
# Run localhost
yarn dev

# Build your Gatsby site
yarn build
```

### Netlify CMS integration
This blog feature netlify CMS integration for editing and managing your blog posts. If wanting to use Netlify CMS as the content editor, then you need to be run the proxy in another terminal tab. Then visit
http://localhost:8000/admin to view the editor.
```sh
# Run proxy
yarn proxy
```

## Configuring Netlify CMS
You can follow this https://www.netlifycms.org/docs/gatsby/ integration document to setup Netlify CMS. The major task here is to create authrization token from your repository manager and add it to your config.yml

### Contributing to this Blog
1) Log in into your https://blog.logesht.dev/admin/ using your github account. You may need to Fork this repo if prompted.
2) The things should be pretty straight forward once you enter the dashboard.
3) Get added yourself as a author.
4) Start Writting your digests and Publish them.

Happy Writting!!

### Netlify Status (Deployment Status):
[![Netlify Status](https://api.netlify.com/api/v1/badges/cdfbc44e-9173-4b18-8e21-4ee680bc089c/deploy-status)](https://app.netlify.com/sites/blog-logesh/deploys)


## Todo
Configure preview Paths.


