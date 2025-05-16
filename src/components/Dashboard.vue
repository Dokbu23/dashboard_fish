<template>
  <v-main class="main-content">
    <v-container fluid>
      <!-- Add this row after your Auto Feeder card -->
<v-row>
  <v-col cols="12">
    <v-card class="inventory-graph-card">
      <v-card-title>
        <span class="headline">Fish Inventory Overview</span>
      </v-card-title>
      <v-card-text style="height: 300px">
        <v-chart
          :option="fishInventoryGraphData"
          autoresize
        />
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
      <!-- Monitoring Cards Row -->
      <v-row>
        <!-- pH Level Card -->
        <v-col cols="12" md="4">
          <v-card class="monitoring-card">
            <v-card-title>
              <v-icon color="primary" class="mr-2">mdi-water-outline</v-icon>
              pH Level
            </v-card-title>
            <v-card-text class="text-h5" :class="phColor">
              {{ waterQuality.ph }}
              <v-icon v-if="waterQuality.ph < 6.5 || waterQuality.ph > 8.5" color="red">mdi-alert</v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Temperature Card -->
        <v-col cols="12" md="4">
          <v-card class="monitoring-card">
            <v-card-title>
              <v-icon color="success" class="mr-2">mdi-thermometer</v-icon>
              Temperature
            </v-card-title>
            <v-card-text class="text-h5" :class="temperatureColor">
              {{ waterQuality.temperature }} °C
              <v-icon v-if="waterQuality.temperature < 22 || waterQuality.temperature > 28" color="red">mdi-alert</v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Ammonia Card -->
        <v-col cols="12" md="4">
          <v-card class="monitoring-card">
            <v-card-title>
              <v-icon color="warning" class="mr-2">mdi-molecule</v-icon>
              Ammonia
            </v-card-title>
            <v-card-text class="text-h5" :class="ammoniaColor">
              {{ waterQuality.ammonia }} mg/L
              <v-icon v-if="waterQuality.ammonia > 0.5" color="red">mdi-alert</v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Second Row with Water Level and Fish Inventory -->
      <v-row>
        <v-col cols="12" md="4">
          <!-- Water Level Card -->
          <v-card class="monitoring-card">
            <v-card-title>
              <v-icon color="info" class="mr-2">mdi-waves</v-icon>
              Water Level
            </v-card-title>
            <v-card-text class="text-h5" :class="waterLevelColor">
              {{ waterQuality.waterLevel }} %
              <v-icon v-if="waterQuality.waterLevel < 60 || waterQuality.waterLevel > 90" color="red">mdi-alert</v-icon>
            </v-card-text>
          </v-card>

          <!-- Water Quality Status Card -->
          <v-card class="water-quality-card mt-4">
            <v-card-title>
              <span class="headline">Water Quality Status</span>
              <v-spacer></v-spacer>
              <v-chip :color="waterStatusColor">{{ waterStatus }}</v-chip>
            </v-card-title>
          </v-card>
        </v-col>

        <!-- Fish Inventory Card -->
        <v-col cols="12" md="8">
          <v-card class="fish-inventory-card">
            <v-card-title>
              <span class="headline">Fish Inventory</span>
              <v-spacer></v-spacer>
              <v-btn color="green" @click="showAddFishDialog = true" prepend-icon="mdi-plus">Add Fish</v-btn>
            </v-card-title>
            <v-list class="fish-list">
              <v-list-item v-for="(fish, index) in fishInventory" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="fish-name">
                    {{ fish.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon color="primary" class="mr-1">mdi-fish</v-icon>
                    Quantity: {{ fish.quantity }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-icon :color="healthColor(fish.health)" class="mr-1">mdi-heart</v-icon>
                    Health: {{ fish.health }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-actions>
                  <v-btn icon color="orange" @click="editFish(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" @click="deleteFish(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-actions>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <small>* Click on a fish to view details</small>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Auto Feeder Card -->
      <v-row>
        <v-col cols="12">
          <v-card class="auto-feeder-card">
            <v-card-title>
              <span class="headline">Auto Feeder</span>
              <v-spacer></v-spacer>
              <v-switch
                v-model="autoFeederEnabled"
                color="green"
                @change="toggleAutoFeeder"
              ></v-switch>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="feedingSchedule.time"
                    label="Feeding Time"
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="feedingSchedule.amount"
                    label="Food Amount (g)"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                color="blue"
                block
                @click="saveFeedingSchedule"
                :disabled="!autoFeederEnabled"
              >Save Schedule</v-btn>
              <v-btn
                color="orange"
                block
                class="mt-2"
                @click="feedNow"
                :disabled="!autoFeederEnabled"
              >Feed Now</v-btn>
            </v-card-text>
            <v-card-text v-if="nextFeeding">
              <div class="text-center">
                <strong>Next Feeding:</strong> {{ nextFeeding }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- Add/Edit Fish Dialog -->
  <v-dialog v-model="showAddFishDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ editingFishIndex !== null ? 'Edit Fish' : 'Add Fish' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="newFish.name"
            label="Fish Species"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="newFish.quantity"
            label="Quantity"
            type="number"
            :rules="[v => !!v || 'Quantity is required', v => v > 0 || 'Must be positive']"
            required
          ></v-text-field>
          <v-text-field
            v-model="newFish.health"
            label="Health Status"
            :rules="[v => !!v || 'Health status is required']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="editingFishIndex !== null ? updateFish() : addFish()">
          {{ editingFishIndex !== null ? 'Update' : 'Add' }}
        </v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="waterQualityAlert" color="red" timeout="5000">
    {{ alertMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="waterQualityAlert = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

// Register necessary components
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);
// Add this computed property
const fishInventoryGraphData = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: fishInventory.value.map(fish => fish.name),
      axisLabel: {
        color: '#333'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#333'
      }
    },
    series: [{
      data: fishInventory.value.map(fish => fish.quantity),
      type: 'bar',
      itemStyle: {
        color: '#2196F3' // Blue color
      },
      label: {
        show: true,
        position: 'top',
        color: '#333'
      }
    }],
    tooltip: {
      trigger: 'item'
    }
  };
});
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getAuth } from "firebase/auth";

// State
const waterQuality = ref({
  ph: 7.5,
  temperature: 25,
  ammonia: 0.5,
  waterLevel: 70
});

const fishInventory = ref([
  { name: "Goldfish", quantity: 10, health: "Healthy" },
  { name: "Betta", quantity: 5, health: "Sick" }
]);

const autoFeederEnabled = ref(false);
const feedingSchedule = ref({ time: "08:00", amount: 5 });
const nextFeeding = ref("");
const feedingTimer = ref(null);

const showAddFishDialog = ref(false);
const newFish = ref({ name: "", quantity: 0, health: "" });
const editingFishIndex = ref(null);
const valid = ref(false);
const form = ref(null);

const waterQualityAlert = ref(false);
const alertMessage = ref("");
const monitoringInterval = ref(null);

// Computed Properties
const phColor = computed(() => {
  const ph = waterQuality.value.ph;
  if (ph < 6.5 || ph > 8.5) return "red--text";
  if (ph < 7 || ph > 8) return "orange--text";
  return "green--text";
});

const temperatureColor = computed(() => {
  const temp = waterQuality.value.temperature;
  if (temp < 22 || temp > 28) return "red--text";
  if (temp < 23 || temp > 27) return "orange--text";
  return "green--text";
});

const ammoniaColor = computed(() => {
  const ammonia = waterQuality.value.ammonia;
  if (ammonia > 0.5) return "red--text";
  if (ammonia > 0.3) return "orange--text";
  return "green--text";
});

const waterLevelColor = computed(() => {
  const level = waterQuality.value.waterLevel;
  if (level < 60 || level > 90) return "red--text";
  if (level < 70 || level > 80) return "orange--text";
  return "green--text";
});

const waterStatus = computed(() => {
  const { ph, temperature, ammonia, waterLevel } = waterQuality.value;
  if (ph < 6.5 || ph > 8.5 || temperature < 22 || temperature > 28 || 
      ammonia > 0.5 || waterLevel < 60 || waterLevel > 90) return "Poor";
  if (ph < 7 || ph > 8 || temperature < 23 || temperature > 27 || 
      ammonia > 0.3 || waterLevel < 70 || waterLevel > 80) return "Fair";
  return "Good";
});

const waterStatusColor = computed(() => ({
  Good: "green",
  Fair: "orange",
  Poor: "red"
})[waterStatus.value]);

// Methods
const healthColor = (health) => {
  if (!health) return "orange";
  const healthLower = health.toLowerCase();
  if (healthLower.includes("healthy")) return "green";
  if (healthLower.includes("sick")) return "red";
  return "orange";
};

const addFish = () => {
  if (form.value.validate()) {
    fishInventory.value.push({ ...newFish.value });
    closeDialog();
  }
};

const editFish = (index) => {
  editingFishIndex.value = index;
  newFish.value = { ...fishInventory.value[index] };
  showAddFishDialog.value = true;
};

const updateFish = () => {
  if (form.value.validate()) {
    fishInventory.value[editingFishIndex.value] = { ...newFish.value };
    closeDialog();
  }
};

const deleteFish = (index) => {
  fishInventory.value.splice(index, 1);
};

const closeDialog = () => {
  showAddFishDialog.value = false;
  editingFishIndex.value = null;
  newFish.value = { name: "", quantity: 0, health: "" };
  form.value.resetValidation();
};

const toggleAutoFeeder = () => {
  autoFeederEnabled.value ? startFeedingSchedule() : clearFeedingSchedule();
};

const startFeedingSchedule = () => {
  calculateNextFeeding();
  feedingTimer.value = setInterval(() => {
    feedNow();
    calculateNextFeeding();
  }, 86400000); // 24 hours
};

const clearFeedingSchedule = () => {
  clearInterval(feedingTimer.value);
  feedingTimer.value = null;
  nextFeeding.value = "";
};

const calculateNextFeeding = () => {
  const now = new Date();
  const [hours, minutes] = feedingSchedule.value.time.split(":");
  const next = new Date();
  next.setHours(+hours, +minutes, 0, 0);
  if (next < now) next.setDate(next.getDate() + 1);
  nextFeeding.value = next.toLocaleString();
};

const saveFeedingSchedule = () => {
  calculateNextFeeding();
};

const feedNow = () => {
  alertMessage.value = `Dispensed ${feedingSchedule.value.amount}g of fish food`;
  waterQualityAlert.value = true;
};

const monitorWaterQuality = () => {
  const rand = () => (Math.random() - 0.5) * 0.5;
  waterQuality.value = {
    ph: Math.max(6, Math.min(9, waterQuality.value.ph + rand())),
    temperature: Math.max(20, Math.min(30, waterQuality.value.temperature + rand())),
    ammonia: Math.max(0, Math.min(1, waterQuality.value.ammonia + rand() * 0.1)),
    waterLevel: Math.max(50, Math.min(100, waterQuality.value.waterLevel + rand() * 5)),
  };

  if (waterStatus.value === "Poor") {
    alertMessage.value = "Warning: Poor water quality detected!";
    waterQualityAlert.value = true;
  }
};

// Lifecycle
onMounted(() => {
  monitoringInterval.value = setInterval(monitorWaterQuality, 5000);
  if (autoFeederEnabled.value) startFeedingSchedule();
});

onUnmounted(() => {
  clearInterval(monitoringInterval.value);
  clearFeedingSchedule();
});
</script>

<style scoped>
.main-content {
  padding: 16px;
}

.monitoring-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.water-quality-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fish-inventory-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fish-list {
  max-height: 300px;
  overflow-y: auto;
}

.fish-name {
  font-weight: 500;
}

.auto-feeder-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.inventory-graph-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.inventory-graph-card .v-card-title {
  padding: 16px;
  border-bottom: 1px solid #eee;
}
</style>