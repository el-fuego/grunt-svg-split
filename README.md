# grunt-svg-split
Split SVG sprite to files

___
### Instalation

```shell
npm install https://github.com/el-fuego/grunt-svg-split --save-dev
```

___
### Usage Example

```js
grunt.initConfig({
    'svg-split': {
        sprite: {
            src: [
                'path/to/sprite.svg'
            ],
            dist: 'path/to/folder'
        }
    }
};
```

#### src
Type: `Array`
Default value: `[]`

Array of files masks for splitting


#### dest
Type: `String`
Default value: `''`

Directory for splitted SVGs
