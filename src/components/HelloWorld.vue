<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.entered" :rules="['required']" label="Entered By " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select v-model="sendData.city" :items="cities" :rules="['required']" label="City" outline></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select v-model="sendData.entity" :items="entities" :rules="['required']" label="Entity" outline></v-select>
                </v-flex>
                <template v-if="sendData.entity">
                  <v-flex sm12 md6>
                    <v-select
                      v-model="sendData.property" :rules="['required']"
                      :items="properties"
                      label="Property Name"
                      outline
                    ></v-select>
                  </v-flex>
                </template>

                <template v-if="sendData.property">
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.floor" :rules="['required']" label="Floor No. " outline></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.floor">
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.flat" :rules="['required']" label="Flat No. " outline></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.flat">
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.room" :rules="['required']" label="Room No. " outline></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.room">
                  <v-flex sm12 md6>
                    <h3 class="uuid">{{ uuid1 }}</h3>
                  </v-flex>

                  <v-flex sm12 md6>
                    <v-btn v-model="sendData.counter" v-on:click="counter += 1">Add Item</v-btn>
                  </v-flex>
                  <v-flex sm12 md6>
                    <h3 class="uuid">{{ uuid2 }}</h3>
                  </v-flex>
                  <v-flex sm12 md6>
      <form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file">
    <input type="submit" value="Submit" >
</form>     </v-flex>
                  <v-flex sm12 md6>
                    <v-btn @click="getData">Submit</v-btn>
                    </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import { uuid } from "vue-uuid";
import axios from "axios";
export default {
  data: () => ({
    uuid2: uuid.v1(),
    uuid1: uuid.v1(),
    myimage:"",
    rowNum: 0,
    counter: 0,
    sendData: {
      property: "",
      entity: "",
      entered: "",
      room: "",
      flat: "",
      floor: "",
      city: "",
      myimage:"",
      counter: "",
      uuid2: "",
      uuid1: ""
    },

    properties: ["er"],
    cities: ["blore"],
    entities: ["Office", "Kitchen", "Property"]
  }),
  methods: {
    async getData() {
      console.log("sendData", this.sendData);


      axios.post("http://localhost:3000/upload/insert", this.sendData);
    },

    //City() {
      //axios.get("http://localhost:3000/Centers/getcityname").then(response => {
        //response.data.forEach(element => {
          //this.cities.push(element.CITY);
          //this.properties.push(element.LOCALNAME);
        //});

        // console.log("Vname", this.);
     // });
    //},
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },

    addRow() {
      this.rowNum++;
    },
    IDGenerator() {
      this.length = 8;
      this.timestamp = +new Date();

      var _getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < this.length; ++i) {
          var index = _getRandomInt(0, parts.length - 1);
          id += parts[index];
        }

        return id;
      };

      console.log(this.sendData.id);
    }
  },

  //mounted() {
    //this.City();
  //}
};
</script>

<style>
</style>
