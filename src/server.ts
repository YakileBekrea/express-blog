//This is an express server using handlebars to facilitate and display a blog.
//Jarod La Belle

import express, {Express, Request, Response} from "express";
import { engine } from "express-handlebars";
import { createServer } from "http";
import httpProxy from "http-proxy";
import helmet from "helmet";
import bodyParser from "body-parser";
import { HelperDelegateObject } from "express-handlebars/types";

const app: Express = express();
const port = 3000;

const posts = 
[{
    title: "The First Post!",
    content: "This is some test content. It's not very interesting.",
    time: new Date(),
    postid: "2"
},
{
    title: "A much longer post",
    content: "This is a much longer post, mostly about how I've been trying to get this system to work.\nMan, back end web development is hard.",
    time: new Date(),
    postid: "3"
},
{
    title: "Cheese",
    content: "Just had some cheese. Thought you all should know.",
    time : new Date(),
    postid: "4"
}];

//const proxy = httpProxy.createProxyServer({
    //target: "http://localhost:3100",
    //ws: true,
    //changeOrigin: true
//});



app.set("views", "templates");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(helmet());
app.use(bodyParser());

app.get("/", (req, res) => {
    res.render("home.handlebars", {
        posts,
        req
    });
});


app.get("/posts/:id", (req, res) => {

    const post = posts.filter((i, n) =>
    {
        return i.postid === req.params.id;
    })

    res.render("post.handlebars", {
        post,
        req
    })
});

app.post("/add", (req, res) => {
    console.log(req.body);
    
    const newPost = {
        postid: "" + req.body.id,
        title: "" + req.body.title,
        content: "" + req.body.content,
        time: new Date()
    };

    posts.push(newPost);

    res.send(JSON.stringify(posts));
})

app.use(express.static("static"));
app.use(express.static("node_modules/bootstrap/dist"));
//app.use((req, res) => proxy.web(req, res));

//const server = createServer(app);

//server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));

app.listen(port, "127.0.0.1", () => {
    console.log("[server]: Server is running at http://localhost:" + port);
});
