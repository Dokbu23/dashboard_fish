<template>
  <!-- Top Toolbar -->
  <v-toolbar class="top-toolbar" color="blue-grey-darken-3" flat>
    <h1>Fish Dashboard</h1>
    <div class="menu-container">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="#ffca28" v-bind="props">
            Settings
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in dropdownItems"
            :key="index"
            @click="handleItemClick(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>

  <!-- Layout Wrapper -->
  <div class="layout">
    <!-- Reports Card (left-aligned) -->
    <v-card class="reports-card" color="blue-grey-darken-3" max-width="300">
      <v-list density="compact">
        <v-list-subheader>REPORTS</v-list-subheader>
        <v-list-item v-for="(item, i) in reports" :key="i" color="primary">
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Fish Inventory Section -->
    <v-card class="fish-inventory-card" color="light-blue lighten-4" max-width="400">
      <v-card-title>
        <span class="headline">Fish Inventory</span>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="showAddFishDialog = true">Add Fish</v-btn>
      </v-card-title>
      <v-list>
        <v-list-item v-for="(fish, index) in fishInventory" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ fish.name }} ({{ fish.quantity }})</v-list-item-title>
            <v-list-item-subtitle>Health: {{ fish.health }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Water Quality Monitoring Section -->
    <v-card class="water-quality-card" color="light-green lighten-4" max-width="400">
      <v-card-title>
        <span class="headline">Water Quality</span>
      </v-card-title>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>pH Level: {{ waterQuality.ph }}</v-list-item-title>
            <v-list-item-title>Temperature: {{ waterQuality.temperature }} °C</v-list-item-title>
            <v-list-item-title>Ammonia Level: {{ waterQuality.ammonia }} mg/L</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>

  <!-- Add Fish Dialog -->
  <v-dialog v-model="showAddFishDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Fish</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="newFish.name" label="Fish Species" required></v-text-field>
          <v-text-field v-model="newFish.quantity" label="Quantity" type="number" required></v-text-field>
          <v-text-field v-model="newFish.health" label="Health Status" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="addFish">Add</v-btn>
        <v-btn @click="showAddFishDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth"; // Proper Firebase imports
import { ref } from 'vue';

// Dropdown items for the menu
const dropdownItems = [
  { title: "Profile" },
  { title: "Address" },
  { title: "Feedback" },
  { title: "Logout" },
];

const reports = [
  { icon: "mdi-chart-line", text: "Sales Report" },
  { icon: "mdi-chart-bar", text: "Inventory Report" },
  { icon: "mdi-chart-pie", text: "Customer Report" },
];

const fishInventory = ref([
  { name: "Goldfish", quantity: 10, health: "Healthy" },
  { name: "Betta", quantity: 5, health: "Sick" },
]);

const waterQuality = ref({
  ph: 7.5,
  temperature: 25,
  ammonia: 0.5,
});

const showAddFishDialog = ref(false);
const newFish = ref({
  name: "",
  quantity: 0,
  health: "",
});

const valid = ref(false);
const form = ref(null);

// Firebase auth instance
const auth = getAuth();

const handleItemClick = (item) => {
  if (item === "Logout") {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
        window.location.href = "/Login"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  } else {
    console.log(`Clicked on ${item}`);
  }
};

const addFish = () => {
  if (form.value.validate()) {
    fishInventory.value.push({ ...newFish.value });
    newFish.value = { name: "", quantity: 0, health: "" };
    showAddFishDialog.value = false;
  }
};
</script>

<style scoped>
.top-toolbar {
  background-color: #37474f;
  color: white;
}
.menu-container {
  margin-left: auto;
}
.layout {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.reports-card {
  flex: 1;
  margin-right: 20px;
}
.fish-inventory-card {
  flex: 2;
  margin-right: 20px;
}
.water-quality-card {
  flex: 1;
}
.reports-card,
.fish-inventory-card,
.water-quality-card {
  border-radius: 8px;
}
</style>
