const copy = require("recursive-copy");
const path = require("path");
const fs = require("fs");

const LANGS = {
    as: "assemblyscript",
    assemblyscript: "assemblyscript",
    c: "c",
    d: "d",
    go: "go",
    rs: "rust",
    rust: "rust",
}

const HELP = {
    assemblyscript: {
        name: "AssemblyScript",
        setup: "npm install",
        build: "npm run build",
        cart: "build/cart.wasm",
    },
    c: {
        name: "C",
        build: "make",
        cart: "build/cart.wasm",
    },
    d: {
        name: "D",
        build: "make",
        cart: "cart.wasm",
    },
    go: {
        name: "Go",
        build: "make",
        cart: "build/cart.wasm",
    },
    rust: {
        name: "Rust",
        build: "cargo build --release",
        cart: "target/wasm32-unknown-unknown/release/cart.wasm",
    },
}

async function run (destDir, opts) {
    let lang = LANGS[opts.lang];
    if (opts.assemblyscript) {
        lang = LANGS.assemblyscript;
    } else if (opts.c) {
        lang = LANGS.c;
    } else if (opts.d) {
        lang = LANGS.d;
    } else if (opts.go) {
        lang = LANGS.go;
    } else if (opts.rust) {
        lang = LANGS.rust;
    }

    const srcDir = path.resolve(__dirname+"/../assets/templates/"+lang);
    await copy(srcDir, destDir, { dot: true });
    await init(destDir, lang);

    const help = HELP[lang];
    console.log(`OK! Created ${help.name} project at ${path.resolve(destDir)}`);
    console.log();
    if (help.setup) {
        console.log(`First setup the project by running:`);
        console.log();
        console.log(`    ${help.setup}`);
        console.log();
    }
    console.log("Build it by running:");
    console.log();
    console.log(`    ${help.build}`);
    console.log();
    console.log("Then run it with:");
    console.log();
    console.log(`    w4 run ${help.cart}`);
    console.log();
}

async function init (destDir, lang) {
    switch (lang) {
        case LANGS.assemblyscript:
            const projectName = path.basename(destDir);
            const file = destDir + "/package.json";
            const json = JSON.parse(fs.readFileSync(file));
            json.name = projectName;
            fs.writeFileSync(file, JSON.stringify(json, null, '  '));
            break;
    }    
}

exports.run = run;
