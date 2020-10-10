<template>
  <nav>
    <v-toolbar flat>
      <v-app-bar class="white toolbar-container" flat app>
        <v-img
          class="mx-2"
          src="@/assets/logo.png"
          max-height="42"
          max-width="42"
          alt="Logo"
          contain
        ></v-img>
        <v-toolbar-title>
          <div class="subtitle-2 font-weight-bold title-toolbar">
            SMK Raden Umar Said
          </div>
          <div class="caption font-weight-light title-toolbar">
            Jalan Sukun Raya 9, Besito, Gebog, Kudus
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items v-for="link in links" :key="link.text">
          <v-btn text small class="font-weight-medium" :to="link.to">
            {{ link.text }}
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
    </v-toolbar>

    <v-navigation-drawer temporary v-model="drawer" right app>
      <v-list dense nav>
        <v-list-item v-for="link in links" :key="link.text" route :to="link.to">
          <v-list-item-content>
            <v-list-item-title
              class="text-center font-weight-medium text-uppercase"
              >{{ link.text }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        { text: "Beranda", to: "/" },
        { text: "Informasi", to: "/informasi" },
        { text: "Masuk", to: "/masuk" },
        { text: "Daftar", to: "/daftar" },
      ],
      drawer: false,
    };
  },
};
</script>

<style scoped>
.toolbar-container {
  width: 85% !important;
  margin: 0 auto !important;
}

.v-toolbar__items {
  height: 70% !important;
}

.v-btn--active,
.v-btn:hover {
  color: #2a429e !important;
}

.v-btn::before {
  opacity: 0 !important;
}

.v-list-item--link:before {
  background-color: transparent !important;
}

.v-list-item--active {
  color: #2a429e !important;
}

.v-btn--icon {
  display: none !important;
}

@media only screen and (max-width: 900px) {
  .v-toolbar__items {
    display: none !important;
  }

  .v-btn--icon {
    display: block !important;
  }
}
</style>