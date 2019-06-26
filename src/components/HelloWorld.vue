<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.entered"
                    :rules="['required']"
                    label="Entered By "
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.city"
                    :items="cities"
                    :rules="['required']"
                    label="City"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.entity"
                    :items="entities"
                    :rules="['required']"
                    label="Entity"
                    outline
                  ></v-select>
                </v-flex>
                <template v-if="sendData.entity">
                  <v-flex sm12 md6>
                    <v-combobox
                      v-model="sendData.property"
                      :rules="['required']"
                      :items="properties"
                      label="Property Name"
                      outline
                    ></v-combobox>
                  </v-flex>
                </template>

                <template v-if="sendData.property">
                  <v-flex sm12 md6>
                    <v-text-field
                      v-model="sendData.floor"
                      :rules="['required']"
                      label="Floor No. "
                      outline
                    ></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.floor">
                  <v-flex sm12 md6>
                    <v-text-field
                      v-model="sendData.flat"
                      :rules="['required']"
                      label="Flat No. "
                      outline
                    ></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.flat">
                  <v-flex sm12 md6>
                    <v-text-field
                      v-model="sendData.room"
                      :rules="['required']"
                      label="Room No. "
                      outline
                    ></v-text-field>
                  </v-flex>
                </template>
                <template v-if="sendData.room">
                  <v-flex sm12 md6>
                    <v-input v-model="sendData.uuid1">{{ uuid1 }}</v-input>
                  </v-flex>
                  <v-layout row wrap>
                    <v-flex sm12 md4>
                      <v-btn v-model="sendData.counter" v-on:click="counter += 1">Add Item {{counter}}</v-btn>
                    </v-flex>
                    <v-flex sm12 md4>
                      <v-input v-model="sendData.uuid2">{{ uuid2 }}</v-input>
                    </v-flex>
                    <v-flex sm12 md4>
                      <label>
                        File
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload">
                      </label>
                    </v-flex>
                  </v-layout>
                  <v-flex sm12 md6>
                    <v-btn @click="submitFile();">Submit</v-btn>
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
import { uuid } from "vue-uuid";
import axios from "axios";
export default {
  data: () => ({
    baseURl: "http://3.218.108.144:4201/",
    uuid2: uuid.v1(),
    uuid1: uuid.v1(),
    counter: 0,
    sendData: {
      property: "",
      entity: "",
      entered: "",
      room: "",
      flat: "",
      floor: "",
      city: "",
      filename: "",
      counter:"",
      uuid2: uuid.v1(),
      uuid1: uuid.v1()
    },
    properties: [],
    cities: [],
    entities: ["Office", "Kitchen", "Property"]
  }),
  methods: {
    submitFile() {
      let self = this;
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(this.baseURL + "/api/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data.filename);
          self.sendData.filename= res.data.filename;
          self.getData();
          
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    
    async getData() {
      this.sendData.counter = this.counter;
      console.log("sendData", this.sendData);

      axios.post(this.baseURL +"upload/insert", this.sendData);
    },

    
    City() {
    axios.get(this.baseURl + "Centers/getcityname").then(response => {
    response.data.forEach(element => {
    this.cities.push(element.CITY);
    this.properties.push(element.LOCALNAME);
    });

    
    });
    },

    
  },

  mounted() {
  this.City();
  }
};
</script>

<style>
</style>
