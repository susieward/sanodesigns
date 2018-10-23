<template>
<div class="loader">


<div class="lds-css ng-scope">
    <div style="width:100%;height:100%" class="lds-rolling"><div></div></div>
    </div>


</div>
</template>
<style type="text/css">

    @keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.lds-rolling {
  position: relative;
    margin: auto;
}
.lds-rolling div,
.lds-rolling div:after {
  position: absolute;
  width: 160px;
  height: 160px;
  border: 20px solid #f56c7c;
  border-top-color: transparent;
  border-radius: 50%;
}
.lds-rolling div {
  -webkit-animation: lds-rolling 1s linear infinite;
  animation: lds-rolling 1s linear infinite;
  top: 100px;
  left: 100px;
}
.lds-rolling div:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.lds-rolling {
  width: 76px !important;
  height: 76px !important;
  -webkit-transform: translate(-38px, -38px) scale(0.38) translate(38px, 38px);
  transform: translate(-38px, -38px) scale(0.38) translate(38px, 38px);
}
</style>
<script>



    </script>
