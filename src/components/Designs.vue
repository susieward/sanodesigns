<template>
  <div class="designs">

      <div class="designs-container">

          <h2 style="text-align: center; margin-bottom: 35px">My Designs</h2>

           <div class="saved-designs">

               <div v-for="session in sessions" class="session-container" :key="session.id">
<div class="session">



                   <div class="design-preview">
        <img :src="session.dataURL" class="design-preview-img"/>
        </div>
                   <div class="session-details">
               <p>{{ session.selectedType }}<br>
                    <span v-if="session.necklace">{{ formatLength(session.necklaceLength) }}</span>


                   <span v-if="session.bracelet">{{ session.braceletSize }} ({{ formatLength(session.braceletLength) }})</span><br>
                   <span v-if="session.selectedMaterial">{{ session.selectedMaterial.type }}, {{ session.selectedMaterial.color }}</span>
                   <span v-if="session.selectedClasp">{{ selectedClasp }}</span>

                   </p>
                   </div>
               <button class="btn-xsmall-gray" @click="showDelete(session)">delete</button>

                <button class="btn-xsmall-gray" @click="resumeSession(session.id)">resume</button>
</div>
                <div v-if="deleteClickShow(session)">

                <p>Are you sure you want to delete this design? You can't undo this action!</p>

                    <p><span>

                        <button class="btn-small-gray" @click="deleteSession(selectedSession.id)">yes, delete</button>
                      <button class="btn-small-gray" @click="cancelDelete">no, cancel</button>

                        </span></p>

                </div>
               </div>




          </div>

          <div class="delete-all">
          <button class="btn-small" @click="showDeleteAll" v-if="deleteAllClick === false">delete all designs</button>
          </div>

          <div v-if="deleteAllClick === true">

          <p>Are you sure you want to delete all saved designs? You can't undo this action!</p>

              <p><span>

                  <button class="btn-small-gray" @click="deleteSessions">yes, delete</button>
                <button class="btn-small-gray" @click="cancelDeleteAll">no, cancel</button>

                  </span></p>

          </div>






              </div>
          </div>


</template>
<script>
export default {
data() {
    return {
        deleteClick: false,
        deleteAllClick: false,
        selectedSession: ''

    }
},

    name: 'Designs',





    computed: {

        savedSessions(){

            return this.$store.state.savedSessions;
        },

        sessions(){

            return this.$store.state.sessions;
        },

        savedIds(){

            return this.$store.getters.savedIds;
        },

        sessionId(){
            return this.$session.id();
        },


        sessionData() {
            return this.$session.getAll();
        }

    },

    methods: {

      deleteClickShow(session){
        return this.deleteClick === true && this.selectedSession.id === session.id;
      },


          formatLength: function(value){
            return value + '' + ' cm'
        },

        showDelete: function(session){

            this.deleteClick = true;
            this.selectedSession = session;

        },

        showDeleteAll: function(){

            this.deleteAllClick = true;

        },

        cancelDeleteAll: function(){

            this.deleteAllClick = false;

        },

        deleteSessions: function(){

            this.$store.commit('deleteSessions');
            this.$router.push('/');
            this.$store.dispatch('loadSessions');

        },

        deleteSession: function(id){

            this.$store.commit('deleteSession', id);
            this.$store.dispatch('loadSessions');
            this.$router.push('/designs');

        },

        cancelDelete: function(){

          this.deleteClick = false;
          this.selectedSession = ''

        },

        resumeSession: function(id){

            var sessId = id;

          var sessions = this.$store.state.sessions;

            var session = sessions.find(sess => sess.id === sessId);

           this.$session.start();


            this.$session.set('sessionType', session.selectedType);
            this.$session.set('sessionNecklace', session.necklace);
            this.$session.set('sessionBracelet', session.bracelet);
            this.$session.set('sessionNecklaceLength', session.necklaceLength);
            this.$session.set('sessionBraceletLength', session.braceletLength);
            this.$session.set('sessionBraceletSize', session.braceletSize);
            this.$session.set('sessionMaterial', session.selectedMaterial);
            this.$session.set('sessionClasp', session.selectedClasp);
            this.$session.set('sessionSelected', session.selectedBeads);
            this.$session.set('sessionTemplate', session.templateBeads);
            this.$session.set('sessionLocal', session.localBeads);
            this.$session.set('sessionDataURL', session.dataURL);


                  this.$router.push('/');








        }


    }
}

</script>
<style>


    .designs {
display: grid;

align-content: flex-start;
grid-template-areas:
                    "content content";

width: 100vw;
margin: 0;
padding: 0;
        justify-content: center;
    }


    .designs-container {

grid-area: content;
display: grid;
width: 1050px;
padding-top: 20px;
padding: 30px;
grid-gap: 30px;
padding-top: 20px;
margin-right: auto;
margin-left: auto;
        justify-content: center;

    }


.saved-designs {
display: grid;
grid-template-columns: auto auto auto;

width: 950px;
margin: auto;

grid-gap: 30px;
margin-bottom: 30px;
justify-content: flex-start;
}

.session-container {
  width: 250px;
}

.session {
width: 250px;
   border: 1px solid #ddd;

}

    .session-details {
  padding: 8px;

    }

.session-img {

}


    .design-preview {
    width: 250px;
    height: auto;
    border-bottom: 1px solid #ddd;
    }

    .design-preview-img {
    height: 100%;
    width: 100%;

    }

    @media screen and (max-width: 1200px){


        .designs-container {
        width: 860px;
        }


.saved-designs {
display: grid;
grid-template-columns: auto auto auto;
width: 750px;
margin: auto;
grid-gap: 20px;
margin-bottom: 30px;
justify-content: center;
}

.session {
width: 250px;
   border: 1px solid #ddd;

}
    }

  @media screen and (max-width: 1000px){

    .designs-container {
    width: 640px;
        }

.saved-designs {
display: grid;
grid-template-columns: auto auto;
width: 560px;
margin: auto;
grid-gap: 20px;
margin-bottom: 30px;
justify-content: center;
}

.session {
width: 250px;
   border: 1px solid #ddd;

}
    }

  @media screen and (max-width: 766px){


        .designs-container {
        width: 600px;
        }

      .delete-all {
        margin: auto;
      }
    }

  @media screen and (max-width: 600px){


        .designs-container {
        width: 400px;
        }

      .saved-designs {
display: grid;
grid-template-columns: auto;
width: 360px;
margin: auto;
grid-gap: 20px;
margin-bottom: 30px;
justify-content: center;
}

.session {
width: 250px;
   border: 1px solid #ddd;

}
    }

  @media screen and (max-width: 400px){


        .designs-container {
        width: 390px;
        }
    }



</style>
