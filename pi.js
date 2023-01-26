AFRAME.registerComponent( "place", {
    schema: {
        state:{
            type: "string",
            default:"places-list"
        },
        selectedCard: {
            type:"string",
            default:"#card1"
        }
    },
    
    init: function(){
        this.placeContainor = this.el;
        this.createCards();
    },
    
    tick:function(){
        const {state} = this.el.getAttribute("place");

        if(state === "view"){
            // this.hideEl([this.placeContainor]);
            // this.showView();
        }
    },

    createCards: function(){
        const thumbnailRef = [
            {
                id: "thor",
                title: "THOR",
                url: "./Thumbnails/thor.png"
            },
            {
                id: "superman",
                title: "Superman",
                url: "./Thumbnails/supe.png"
            },
            {
                id: "batman",
                title: "Batman",
                url: "./Thumbnails/bat.png"
            },
            {
                id: "fantastic-4",
                title: "Fantastic Four",
                url: "./Thumbnails/fant.png"
            }
        ];

        let prevX = -60;

        for(let item of thumbnailRef){
            const posX = prevX + 25;
            const posY = 6;
            const posZ = -40;

            const position = {x:posX, y:posY, z:posZ};
            prevX = posX;

            const border = this.createBorder(position, item.id);
            const thumbnail = this.createThumbnail(item);
            const title = this.createTitle(position, item);
            thumbnail.setAttribute("position", "z", "0.1")
            title.setAttribute("position", "y", "-24")

            border.appendChild(thumbnail);
            border.appendChild(title);

            this.placeContainor.appendChild(border);
        }
    },

    createBorder: function(position, id){
        const en1 = document.createElement("a-entity");

        en1.setAttribute("id", id);
        en1.setAttribute("visible", true);
        en1.setAttribute("geometry", {
            primitive: "plane",
            width: 20,
            height: 26
        });
        en1.setAttribute("position", position);
        en1.setAttribute("material", {
            opacity: 0.4,
            color: "#00bcd4"
        });

        en1.setAttribute("cursor-listener", {})
        return en1;
    },

    createThumbnail: function(item){
        const en1 = document.createElement("a-entity");
        en1.setAttribute("visible", true);
        en1.setAttribute("geometry", {
            primitive: "plane",
            width: 18,
            height: 24
        });
        en1.setAttribute("material", { src: item.url})
        return en1;
    },

    createTitle: function(position, item){
        const en1 = document.createElement("a-entity");

        en1.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            width: "60",
            color: "blue",
            value: item.title
        })

        const enPos = position;
        enPos.y = -20;

        en1.setAttribute("position", enPos);
        en1.setAttribute("visible", true);

        return en1;
    },

    // hideEl: function(eList){
    //     eList.map(el => {
    //         el.setAttribute("visible", false)
    //     })
    // },

    // showView:function(){
    //     const {selectedCard} = this.data;
    //     const skyEl = document.querySelector("#main-containor");

    //     skyEl.setAttribute("material", {src:`./Thumbnails/360/${selectedCard}/place-0.jpg`, color:"#fff"})
    // },
})