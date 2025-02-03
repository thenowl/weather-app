# basic-webpack-template

A basic boiler plate fand configuration for webpack projects.

NOTE:

1.) When using this template, include all branches. "gh-pages" has already been set up!

2.) html-loader is not included in the package.json. To make use of images from within the template.html run "npm install --save-dev html-loader" and add the following rule to the webpack.dev.js & and webpack.prod.js:

{
test: /\.html$/i,
loader: "html-loader",
}
