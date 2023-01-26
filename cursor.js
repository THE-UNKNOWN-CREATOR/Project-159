AFRAME.registerComponent( "cursor-listener", {
    schema:{
        selectedItemId:{ type:"string", default:"" }
    },

    init: function(){
        this.handleClickEvent();
        this.handleMouseEnter();
        this.handleMouseLeave();
    },

    handleClickEvent: function(){
        this.el.addEventListener( "click", evt =>{
            const placeContainer = document.querySelector("#place-container");
            const {state} = placeContainer.getAttribute("place");

            if(state === "places-list"){
                const id = this.el.getAttribute("id");
                const idList = ["thor", "superman", "batman", "fantastic-4"];

                if(idList.includes(id)){
                    if(!id.includes("info"))
                        placeContainer.setAttribute("place", {state: "view", selectedCard: id});
                    else
                        print("yo");
                }
            }
            
            if(state === "view"){
                this.handleViewState();
            }

            if(state === "change-view"){
                this.handleViewState();
            }
        } )
    },

    handlePlaceState: function(){
        const id = this.el.getAttribute("id");
        const idList = ["thor", "superman", "batman", "fantastic-4"];

        if(idList.includes(id)){
            const placeContainer = document.querySelector("#place-container");
            placeContainer.setAttribute( "cursor-listener", {selectedItemId: id } );
            this.el.setAttribute("material", {color:"#ffff00", opacity:1})
        }
    },

    handleMouseEnter:function(){
        this.el.addEventListener("mouseenter", () => {
            this.handlePlaceState()
        })
    },

    handleMouseLeave: function(){

        this.el.addEventListener("mouseleave", () => {
            const {selectedItemId} = this.data;
            if(selectedItemId){
                const el = document.querySelector(`#${selectedItemId}`);
                const id = el.getAttribute("id");
                if(id == selectedItemId){
                    el.setAttribute("material", {
                        opacity: 1,
                        color: "#00bcd4"
                    });
                }
            }
        })
    },

    handleViewState: function(){
        const el = this.el;
        const id = el.getAttribute("id");
        const placeContainer = document.querySelector("#place-container");
        const {state} = placeContainer.getAttribute("place");
        const {selectedItemId} = placeContainer.getAttribute("cursor-listener");

        console.log(selectedItemId);

        if(state === "view"){

            var info = document.createElement("a-entity");
            info.setAttribute("info", {"selectedCard": selectedItemId});

            placeContainer.appendChild(info);
            
            var title = document.querySelector("#app-title")
            title.setAttribute("visible", false)
            var sub_title = document.querySelector("#app-sub-title")
            sub_title.setAttribute("visible", false)
            //document.querySelector(`${id}-info`).setAttribute("visible", "true");
        }
    }

})