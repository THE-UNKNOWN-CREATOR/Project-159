AFRAME.registerComponent( "info", {
    schema: {
        selectedCard: {
            type:"string",
            default:""
        }
    },
    
    init: function(){
        this.placeContainor = this.el;

        if(this.data.selectedCard !== "") this.createCards();
    },

    createCards: function(){
        const thumbnailRef = [
            {
                id: "thor-info",
                title: "THOR",
                url: "./Thumbnails/t-info.png"
            },
            {
                id: "superman-info",
                title: "Superman",
                url: "./Thumbnails/s-info.png"
            },
            {
                id: "batman-info",
                title: "Batman",
                url: "./Thumbnails/b-info.png"
            },
            {
                id: "fantastic-4-info",
                title: "Fantastic Four",
                url: "./Thumbnails/f-info.png"
            }
        ];

        for(let item of thumbnailRef){
            if(item.id.includes(this.data.selectedCard)) {
                const posX = 0;
                const posY = 0;
                const posZ = -30;

                const position = {x:posX, y:posY, z:posZ};
                
                const border = this.createBorder(position, item.id);
                const thumbnail = this.createThumbnail(item);
                thumbnail.setAttribute("position", "z", "0.1")
                border.appendChild(thumbnail);

                border.setAttribute("visible", false);
                border.setAttribute("visible", true);

                this.placeContainor.appendChild(border);
            }
        }
    },

    createBorder: function(position, id){
        const en1 = document.createElement("a-entity");

        en1.setAttribute("id", id);
        en1.setAttribute("visible", true);
        en1.setAttribute("geometry", {
            primitive: "plane",
            width: 90,
            height: 60
        });
        en1.setAttribute("position", position);
        en1.setAttribute("material", {
            opacity: 0.7,
            color: "#000"
        });

        en1.setAttribute("cursor-listener", {})
        return en1;
    },

    createThumbnail: function(item){
        const en1 = document.createElement("a-entity");
        en1.setAttribute("visible", true);
        en1.setAttribute("geometry", {
            primitive: "plane",
            width: 70,
            height: 50
        });
        en1.setAttribute("material", { src: item.url})
        return en1;
    },

}
)