<template>
  <div id="app">
    <div id="nav">
      <router-view/>
      <title>6mnd.us - Url Shortener</title>
      <footer>
        <p class="footer"> <a href="https://github.com/Sysnomid/6nmd.us">Source Code</a> <br /> Created by Sysnomid <strong><a href="https://sysnomid.com"> https://sysnomid.com </a></strong></p>
      </footer>
    </div>
  </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/modern-normalize/modern-normalize.min.css');

/* Global Styles */

html, body {  
  font-family: 'Inter', sans-serif;
  color: #c5c5c5; 
  background-color: #282c35; 
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100vh;
  background-color: #262626;
}

/* Link Styles */

a {
  color: #c5c5c5; 
    text-decoration: underline;
    text-decoration-color: rgb(100, 100, 100);
}
a:hover {
    text-decoration: none;
}

/* Footer Styles */

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5em;
  margin-left: 0.75em;
  font-size: 1.25em;
}

</style>
