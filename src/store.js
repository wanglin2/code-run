import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            editData: {
                config: {
                    blockSize: null,
                    editorSize: null,
                },
                code: {
                    html: {
                        language: 'html',
                        content: `<!DOCTYPE HTML>
<!--Example of comments in HTML-->
<html>
<head>
    <!--This is the head section-->
    <title>HTML Sample</title>
    <meta charset="utf-8">

    <!--This is the style tag to set style on elements-->
    <style type="text/css">
        h1
        {
            font-family: Tahoma;
            font-size: 40px;
            font-weight: normal;
            margin: 50px;
            color: #a0a0a0;
        }

        h2
        {
            font-family: Tahoma;
            font-size: 30px;
            font-weight: normal;
            margin: 50px;
            color: #fff;
        }

        p
        {
            font-family: Tahoma;
            font-size: 17px;
            font-weight: normal;
            margin: 0px 200px;
            color: #fff;
        }

        div.Center
        {
            text-align: center;
        }

        div.Blue
        {
            padding: 50px;
            background-color: #7bd2ff;
        }

        button.Gray
        {
            font-family: Tahoma;
            font-size: 17px;
            font-weight: normal;
            margin-top: 100px;
            padding: 10px 50px;
            background-color: #727272;
            color: #fff;
            outline: 0;
                border: none;
                cursor: pointer;
        }

        button.Gray:hover
        {
            background-color: #898888;
        }

        button.Gray:active
        {
            background-color: #636161;
        }

    </style>

    <!--This is the script tag-->
    <script type="text/javascript">
        function ButtonClick(){
            // Example of comments in JavaScript
            window.alert("I'm an alert sample!");
        }
    </script>
</head>
<body>
    <!--This is the body section-->
    <div class="Center">
        <h1>NAME OF SITE</h1>
    </div>
    <div class="Center Blue">
            <h2>I'm h2 Header! Edit me in &lt;h2&gt;</h2>
            <p>
                I'm a paragraph! Edit me in &lt;p&gt;
                to add your own content and make changes to the style and font.
                It's easy! Just change the text between &lt;p&gt; ... &lt;/p&gt; and change the style in &lt;style&gt;.
                You can make it as long as you wish. The browser will automatically wrap the lines to accommodate the
                size of the browser window.
            </p>
            <button class="Gray" onclick="ButtonClick()">Click Me!</button>
    </div>
</body>
</html>
`
                    },
                    css: {
                        language: 'css',
                        content: `html {
    background-color: #e2e2e2;
    margin: 0;
    padding: 0;
}

body {
    background-color: #fff;
    border-top: solid 10px #000;
    color: #333;
    font-size: .85em;
    font-family: "Segoe UI","HelveticaNeue-Light", sans-serif;
    margin: 0;
    padding: 0;
}

a:link, a:visited, 
a:active, a:hover {
    color: #333;
    outline: none;
    padding-left: 0;
    padding-right: 3px;
    text-decoration: none;
        
}


a:hover {
    background-color: #c7d1d6;
}


header, footer, hgroup
nav, section {
    display: block;
}

.float-left {
    float: left;
}

.float-right {
    float: right;
}

.highlight {
/*    background-color: #a6dbed;
    padding-left: 5px;
    padding-right: 5px;*/
}

.clear-fix:after {
    content: ".";
    clear: both;
    display: block;
    height: 0;
    visibility: hidden;
}

h1, h2, h3, 
h4, h5, h6 {
    color: #000;
    margin-bottom: 0;
    padding-bottom: 0;
    
}

h1 {
    font-size: 2em; 
}

h2 {
    font-size: 1.75em;
}

h3 {
    font-size: 1.2em;
}

h4 {
    font-size: 1.1em;
}

h5, h6 {
    font-size: 1em;
}


.tile {
    /* 2px solid #7ac0da; */
    border: 0;
    
    float: left;
    width: 200px;
    height: 325px;
    
    padding: 5px;
    margin-right: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
    -webkit-perspective: 0;
    -webkit-transform-style: preserve-3d;
    -webkit-transition: -webkit-transform 0.2s;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    background-position: center center;
    background-repeat: no-repeat;
    
    background-color:  #fff;
}

.tile-item {
    /* 2px solid #7ac0da; */
    border-color: inherit;
    float: left;
    width: 50px;
    height: 70px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-image: url('../Images/documents.png');
    background-repeat: no-repeat;
    
}

.tile-wrapper {
    width: 100%;
    font-family: "Segoe UI" , Tahoma, Geneva, Verdana, sans-serif;
    line-height: 21px;
    font-size: 14px;
}

a.blue-box {
    font-size: 28px;
    height: 100px;
    display: block;
    border-style: solid;
    border-width: 1px 1px 4px 1px;
    border-color: #C0C0C0 #C0C0C0 #8ABAE4 #C0C0C0;
    padding-top: 15px;
    padding-left: 15px;
}

    a.blue-box:hover {
    border: 4px solid #8ABAE4; 
    padding-top: 12px;
    padding-left: 12px;
    background-color: #FFFFFF;
}
    
a.green-box {
    font-size: 28px;
    height: 100px;
    display: block;
    border-style: solid;
    border-width: 1px 1px 4px 1px;
    border-color: #C0C0C0 #C0C0C0 #9CCF42 #C0C0C0;
    padding-top: 15px;
    padding-left: 15px;
}

    a.green-box:hover {
        border: 4px solid #9CCF42; 
        padding-top: 12px;
        padding-left: 12px;
        background-color: #FFFFFF;
}


a.green-box2 {
    font-size: 14px;
    height: 48px;
    width: 48px;
    display: block; /* border-color: #C0C0C0; */
    padding-top: 6px;
    font-weight: bold;
    
}

    a.green-box2:hover {
    border: solid #8ABAE4;
    padding-top: 0px;
    padding-left: 0px;
    background-image: url('../Images/documents.png');
    background-color: #EFEFEF;
}

a.yellow-box {
    font-size: 28px;
    height: 100px;
    display: block;
    border-style: solid;
    border-width: 1px 1px 4px 1px;
    border-color: #C0C0C0 #C0C0C0 #DECF6B #C0C0C0;
    padding-top: 15px;
    padding-left: 15px;
}

    a.yellow-box:hover {
        border: 4px solid #DECF6B; 
        padding-top: 12px;
        padding-left: 12px;
        background-color: #FFFFFF;
}
    
    
a.red-box {
    font-size: 28px;
    height: 100px;
    display: block;
    border-style: solid;
    border-width: 1px 1px 4px 1px;
    border-color: #C0C0C0 #C0C0C0 #F79E84 #C0C0C0;
    padding-top: 15px;
    padding-left: 15px;
}

    a.red-box:hover {
    border: 4px solid #F79E84; 
    padding-top: 12px;
    padding-left: 12px;
    background-color: #FFFFFF;
}
    
/* main layout 
----------------------------------------------------------*/
.content-wrapper {
    margin: 0 auto;
    max-width: 960px;
}

#body {
    background-color: #efeeef;
    clear: both;
    padding-bottom: 35px;
}

    .main-content {
        background: url("../images/accent.png") no-repeat;
        padding-left: 10px;
        padding-top: 30px;
    }

    .featured + .main-content {
        background: url("../images/heroaccent.png") no-repeat;
    }

footer {
    clear: both;
    background-color: #e2e2e2;
    font-size: .8em;
    height: 100px;
}


/* site title
----------------------------------------------------------*/
.site-title {
    color: #0066CC; /* font-family: Rockwell, Consolas, "Courier New", Courier, monospace; */
    font-size: 3.3em;
    margin-top: 40px;
    margin-bottom: 0;
}

.site-title a, .site-title a:hover, .site-title a:active  {
    background: none;
    color: #0066CC;
    outline: none;
    text-decoration: none;
}


/* login  
----------------------------------------------------------*/
#login {
    display: block;
    font-size: .85em;
    margin-top: 20px;
    text-align: right;
}

    #login a {
        background-color: #d3dce0;
        margin-left: 10px;
        margin-right: 3px;
        padding: 2px 3px;
        text-decoration: none;
    }
    
    #login a.username {
        background: none;
        margin-left: 0px;
        text-decoration: underline;
    }

    #login li {
        display: inline;
        list-style: none;
    }
    
    
/* menu  
----------------------------------------------------------*/
ul#menu {
    font-size: 1.3em;
    font-weight: 600;
    margin: 0;
    text-align: right;
            text-decoration: none;

}

    ul#menu li {
        display: inline;
        list-style: none;
        padding-left: 15px;
    }

        ul#menu li a {
            background: none;
            color: #999;
            text-decoration: none;
        }

        ul#menu li a:hover {
            color: #333;
            text-decoration: none;
        }



/* page elements  
----------------------------------------------------------*/
/* featured */
.featured {
    background-color: #fff;
}

    .featured .content-wrapper {
        /*background-color: #7ac0da;
        background-image: -ms-linear-gradient(left, #7AC0DA 0%, #A4D4E6 100%);
        background-image: -o-linear-gradient(left, #7AC0DA 0%, #A4D4E6 100%);
        background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #7AC0DA), color-stop(1, #A4D4E6));
        background-image: -webkit-linear-gradient(left, #7AC0DA 0%, #A4D4E6 100%);
        background-image: linear-gradient(left, #7AC0DA 0%, #A4D4E6 100%);
        color: #3e5667;
        */
        padding:  0px 40px 30px 40px;
    }

        .featured hgroup.title h1, .featured hgroup.title h2 {
            /* color: #fff;
                */
        }

        .featured p {
            font-size: 1.1em;
        }

/* page titles */ 
hgroup.title {
    margin-bottom: 10px;
}

hgroup.title h1, hgroup.title h2 {
display: inline;
}

hgroup.title h2 {
    font-weight: normal;
}

/* releases */
.milestone {
    color: #fff;
    background-color: #8ABAE4;
    font-weight:  normal;
    padding:  10px 10px 10px 10px;
    margin: 0 0 0 0;
}
    .milestone .primary {
        font-size: 1.75em;
    }

    .milestone .secondary {
    font-size: 1.2em;
    font-weight: normal;
    /* padding: 5px 5px 5px 10px;*/
        }
    
/* features */
section.feature {
    width: 200px;
    float: left;
    padding: 10px;
}

/* ordered list */
ol.round {
    list-style-type: none;
    padding-left: 0;
}

    ol.round li {
        margin: 25px 0;
        padding-left: 45px;
    }
    
        ol.round li.one {
            background: url("../images/orderedlistOne.png") no-repeat;        
        }
    
        ol.round li.two {
            background: url("../images/orderedlistTwo.png") no-repeat;        
        }
    
        ol.round li.three {
            background: url("../images/orderedlistThree.png") no-repeat;        
        }
    
/* content */  
article {
    float: left;
    width: 70%;
}

aside {
    float: right;
    width: 25%;
}

    aside ul {
        list-style: none;
        padding: 0;
    }
    
        aside ul li {
        background: url("../images/bullet.png") no-repeat 0 50%;
        padding: 2px 0 2px 20px;
        }
        
.label {
    font-weight: 700;
}

/* login page */ 
#loginForm {
    border-right: solid 2px #c8c8c8;
    float: left;
    width: 45%;
}

    #loginForm .validation-error {
        display: block;
        margin-left: 15px;
    }

#socialLoginForm {
    margin-left: 40px;
    float: left;
    width: 50%;
}

/* contact */
.contact h3 {
    font-size: 1.2em;
}

.contact p {
    margin: 5px 0 0 10px;
}

.contact iframe {
    border: solid 1px #333;
    margin: 5px 0 0 10px;
}

/* forms */
fieldset {
    border: none;
    margin: 0;
    padding: 0;
}

    fieldset legend {
        display: none;
    }
    
    fieldset ol {
        padding: 0;
        list-style: none;
    }
    
        fieldset ol li {
            padding-bottom: 5px;
        }
    
    fieldset label {
        display: block;
        font-size: 1.2em;
        font-weight: 600;
    }
    
    fieldset label.checkbox {
        display: inline;
    }
    
    fieldset input[type="text"], 
    fieldset input[type="password"] {
        border: 1px solid #e2e2e2;
        color: #333;
        font-size: 1.2em;
        margin: 5px 0 6px 0;
        padding: 5px;
        width: 300px;
    }
    
        fieldset input[type="text"]:focus, 
        fieldset input[type="password"]:focus {
            border: 1px solid #7ac0da;
        }
    
    fieldset input[type="submit"] {
        background-color: #d3dce0;
        border: solid 1px #787878;
        cursor: pointer;
        font-size: 1.2em;
        font-weight: 600;
        padding: 7px;
    }

/* ajax login/registration dialog */
.modal-popup {
    font-size: 0.7em;
}

/* info and errors */  
.message-info {
    border: solid 1px;
    clear: both;
    padding: 10px 20px;
}

.message-error {
    clear: both;
    color: #e80c4d;
    font-size: 1.1em;
    font-weight: bold;
    margin: 20px 0 10px 0;
}

.message-success {
    color: #7ac0da;
    font-size: 1.3em;
    font-weight: bold;
    margin: 20px 0 10px 0;
}

.success {
    color: #7ac0da;
}

.error {
    color: #e80c4d;
}

/* styles for validation helpers */
.field-validation-error {
    color: #e80c4d;
    font-weight: bold;
}

.field-validation-valid {
    display: none;
}

input[type="text"].input-validation-error,
input[type="password"].input-validation-error {
    border: solid 1px #e80c4d;
}

.validation-summary-errors {
    color: #e80c4d;
    font-weight: bold;
    font-size: 1.1em;
}

.validation-summary-valid {
    display: none;
}


/* social */
ul#social li {
    display: inline;
    list-style: none;
}

    ul#social li a {
        color: #999;
        text-decoration: none;
    }
        
    a.facebook, a.twitter {
        display: block;
        float: left;
        height: 24px;
        padding-left: 17px;
        text-indent: -9999px;
        width: 16px;
    }
        
    a.facebook {
        background: url("../images/facebook.png") no-repeat;
    }
        
    a.twitter {
        background: url("../images/twitter.png") no-repeat;
    }
        
        
        
/********************
*   Mobile Styles   *
********************/
@media only screen and (max-width: 850px) {
    
    /* header  
    ----------------------------------------------------------*/
    header .float-left, 
    header .float-right {
        float: none;
    }
    
    /* logo */
    header .site-title {
        /*margin: 0; */
        /*margin: 10px;*/
        text-align: left;
        padding-left: 0;
    }

    /* login */
    #login {
        font-size: .85em;
        margin-top: 0;
        text-align: center;
    }
    
        #login ul {
            margin: 5px 0;
            padding: 0;
        }
        
        #login li {
            display: inline;
            list-style: none;
            margin: 0;
            padding:0;
        }

        #login a {
            background: none;
            color: #999;
            font-weight: 600;
            margin: 2px;
            padding: 0;
        }
        
        #login a:hover {
            color: #333;
        }

    /* menu */
    nav {
        margin-bottom: 5px;
    }
    
    ul#menu {
        margin: 0;
        padding:0;
        text-align: center;
    }

        ul#menu li {
            margin: 0;
            padding: 0;
        }

        
    /* main layout  
    ----------------------------------------------------------*/
    .main-content,
    .featured + .main-content {
        background-position: 10px 0;
    }
    
    .content-wrapper {
        padding-right: 10px;
        padding-left: 10px;
    }

    .featured .content-wrapper {
        padding: 10px;
    }
    
    /* page content */  
    article, aside {
        float: none;
        width: 100%;
    }
    
    /* ordered list */
    ol.round {
        list-style-type: none;
        padding-left: 0;
    }

        ol.round li {
            padding-left: 10px;
            margin: 25px 0;
        }
    
            ol.round li.one,
            ol.round li.two,
            ol.round li.three {
                background: none;        
            }
        
        /* features */
        section.feature {
        float: none;
        padding: 10px;
        width: auto;
        }
        
        section.feature img {
            color: #999;
            content: attr(alt);
            font-size: 1.5em;
            font-weight: 600;
        }
        
    /* forms */    
    fieldset input[type="text"], 
    fieldset input[type="password"] {
        width: 90%;
    }
    
    /* login page */ 
    #loginForm {
        border-right: none;
        float: none;
        width: auto;
    }

        #loginForm .validation-error {
            display: block;
            margin-left: 15px;
        }

    #socialLoginForm {
        margin-left: 0;
        float: none;
        width: auto;
    }

    /* footer  
    ----------------------------------------------------------*/    
    footer .float-left,
    footer .float-right {
        float: none;
    }
    
    footer {
        text-align: center;
        height: auto;
        padding: 10px 0;
    }
    
        footer p {
            margin: 0;
        }
    
        ul#social {
            padding:0;
            margin: 0;
        }
    
            a.facebook, a.twitter {
            background: none;
            display: inline;
            float: none;
            height: auto;
            padding-left: 0;
            text-indent: 0;
            width: auto;
        }    
}

.subsite {
    color: #444;
}

h3 {
    font-weight: normal;
    font-size: 24px;
    color: #444;
    margin-bottom: 20px;
}

.tiles {
    padding-bottom: 20px;
    background-color: #e3e3e3;
}

#editor {
    margin: 0 auto;
    height: 500px;
    border: 1px solid #ccc;
}

.monaco-editor.monaco, .monaco-editor.vs, .monaco-editor.eclipse {
    background: #F9F9F9;
}

.monaco-editor.monaco .monaco-editor-background, .monaco-editor.vs .monaco-editor-background, .monaco-editor.eclipse .monaco-editor-background {
    background: #F9F9F9;
}`
                    },
                    js: {
                        language: 'javascript',
                        content: `/*
© Microsoft. All rights reserved.

This library is supported for use in Windows Tailored Apps only.

Build: 6.2.8100.0 
Version: 0.5 
*/

(function (global, undefined) {
    "use strict";
    undefinedVariable = {};
    undefinedVariable.prop = 5;

    function initializeProperties(target, members) {
        var keys = Object.keys(members);
        var properties;
        var i, len;
        for (i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var enumerable = key.charCodeAt(0) !== /*_*/95;
            var member = members[key];
            if (member && typeof member === 'object') {
                if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
                    if (member.enumerable === undefined) {
                        member.enumerable = enumerable;
                    }
                    properties = properties || {};
                    properties[key] = member;
                    continue;
                } 
            }
            if (!enumerable) {
                properties = properties || {};
                properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
                continue;
            }
            target[key] = member;
        }
        if (properties) {
            Object.defineProperties(target, properties);
        }
    }

    (function (rootNamespace) {

        // Create the rootNamespace in the global namespace
        if (!global[rootNamespace]) {
            global[rootNamespace] = Object.create(Object.prototype);
        }

        // Cache the rootNamespace we just created in a local variable
        var _rootNamespace = global[rootNamespace];
        if (!_rootNamespace.Namespace) {
            _rootNamespace.Namespace = Object.create(Object.prototype);
        }

        function defineWithParent(parentNamespace, name, members) {
            /// <summary locid="1">
            /// Defines a new namespace with the specified name, under the specified parent namespace.
            /// </summary>
            /// <param name="parentNamespace" type="Object" locid="2">
            /// The parent namespace which will contain the new namespace.
            /// </param>
            /// <param name="name" type="String" locid="3">
            /// Name of the new namespace.
            /// </param>
            /// <param name="members" type="Object" locid="4">
            /// Members in the new namespace.
            /// </param>
            /// <returns locid="5">
            /// The newly defined namespace.
            /// </returns>
            var currentNamespace = parentNamespace,
                namespaceFragments = name.split(".");

            for (var i = 0, len = namespaceFragments.length; i < len; i++) {
                var namespaceName = namespaceFragments[i];
                if (!currentNamespace[namespaceName]) {
                    Object.defineProperty(currentNamespace, namespaceName, 
                        { value: {}, writable: false, enumerable: true, configurable: true }
                    );
                }
                currentNamespace = currentNamespace[namespaceName];
            }

            if (members) {
                initializeProperties(currentNamespace, members);
            }

            return currentNamespace;
        }

        function define(name, members) {
            /// <summary locid="6">
            /// Defines a new namespace with the specified name.
            /// </summary>
            /// <param name="name" type="String" locid="7">
            /// Name of the namespace.  This could be a dot-separated nested name.
            /// </param>
            /// <param name="members" type="Object" locid="4">
            /// Members in the new namespace.
            /// </param>
            /// <returns locid="5">
            /// The newly defined namespace.
            /// </returns>
            return defineWithParent(global, name, members);
        }

        // Establish members of the "WinJS.Namespace" namespace
        Object.defineProperties(_rootNamespace.Namespace, {

            defineWithParent: { value: defineWithParent, writable: true, enumerable: true },

            define: { value: define, writable: true, enumerable: true }

        });

    })("WinJS");

    (function (WinJS) {

        function define(constructor, instanceMembers, staticMembers) {
            /// <summary locid="8">
            /// Defines a class using the given constructor and with the specified instance members.
            /// </summary>
            /// <param name="constructor" type="Function" locid="9">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="10">
            /// The set of instance fields, properties and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="11">
            /// The set of static fields, properties and methods to be made available on the class.
            /// </param>
            /// <returns type="Function" locid="12">
            /// The newly defined class.
            /// </returns>
            constructor = constructor || function () { };
            if (instanceMembers) {
                initializeProperties(constructor.prototype, instanceMembers);
            }
            if (staticMembers) {
                initializeProperties(constructor, staticMembers);
            }
            return constructor;
        }

        function derive(baseClass, constructor, instanceMembers, staticMembers) {
            /// <summary locid="13">
            /// Uses prototypal inheritance to create a sub-class based on the supplied baseClass parameter.
            /// </summary>
            /// <param name="baseClass" type="Function" locid="14">
            /// The class to inherit from.
            /// </param>
            /// <param name="constructor" type="Function" locid="9">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="10">
            /// The set of instance fields, properties and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="11">
            /// The set of static fields, properties and methods to be made available on the class.
            /// </param>
            /// <returns type="Function" locid="12">
            /// The newly defined class.
            /// </returns>
            if (baseClass) {
                constructor = constructor || function () { };
                var basePrototype = baseClass.prototype;
                constructor.prototype = Object.create(basePrototype);
                Object.defineProperty(constructor.prototype, "_super", { value: basePrototype });
                Object.defineProperty(constructor.prototype, "constructor", { value: constructor });
                if (instanceMembers) {
                    initializeProperties(constructor.prototype, instanceMembers);
                }
                if (staticMembers) {
                    initializeProperties(constructor, staticMembers);
                }
                return constructor;
            } else {
                return define(constructor, instanceMembers, staticMembers);
            }
        }

        function mix(constructor) {
            /// <summary locid="15">
            /// Defines a class using the given constructor and the union of the set of instance members
            /// specified by all the mixin objects.  The mixin parameter list can be of variable length.
            /// </summary>
            /// <param name="constructor" locid="9">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <returns locid="12">
            /// The newly defined class.
            /// </returns>
            constructor = constructor || function () { };
            var i, len;
            for (i = 0, len = arguments.length; i < len; i++) {
                initializeProperties(constructor.prototype, arguments[i]);
            }
            return constructor;
        }

        // Establish members of "WinJS.Class" namespace
        WinJS.Namespace.define("WinJS.Class", {
            define: define,
            derive: derive,
            mix: mix
        });

    })(WinJS);

})(this);`
                    }
                }
            }
        }
    },
    mutations: {

    }
})

export default store