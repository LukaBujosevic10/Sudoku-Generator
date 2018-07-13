$(document).ready(function() {
  var brojim = 0;
  let wrap = $('#wrap');
  let kvadrat;
  let gran_child;

  function pravljenje_kvadrata() {
    for (var i = 0; i < 9; i++) {
      $('#wrap').append('<div class="kvadrat"></div>');
    }
    kvadrat = $('.kvadrat');
    for (var i = 0; i < 9; i++) {
      for (var y = 0; y < 9; y++) {
        $(kvadrat[i]).append('<div class="mini-kvadrat"></div>');
      }
    }
    gran_child = $(kvadrat).children();
  }

  pravljenje_kvadrata();

  function kreiranje_sudoku() {
    let moguci_brojevi;
    let deca_kvadrata;
    let sudoku = new Array();
    let viz_niz = new Array();
    let jd_niz = new Array();
    let nemoguci_brojevi = new Array();
    let moguci_brojevi_kopija = new Array();
    let ima_u_kvad = new Array();
    let za_izb = new Array();


    function pravljenje_mugucih_brojeva() {
      moguci_brojevi = new Array(9);
      for (var i = 0; i < 9; i++) {
        moguci_brojevi[i] = i + 1;
      }
    }

    pravljenje_mugucih_brojeva();

    function pravljenje_sudoku() {
      for (var h = 0; h < 3; h++) {
        sudoku[h] = new Array();

        for (var k = 0; k < 3; k++) {
          sudoku[h][k] = new Array();

          for (var r = 0; r < 3; r++) {
            sudoku[h][k][r] = new Array();

          }
        }
      }
    }

    pravljenje_sudoku();

    function popunjavanje_kvadrata(sudoku) {

      proveravam_hor();

    }

    popunjavanje_kvadrata();

    function proveravam_hor() {
      for (var h = 0; h < 3; h++) {
        for (var k = 0; k < 3; k++) {
          for (var r = 0; r < 3; r++) {
            pravljenje_mugucih_brojeva();
            za_izb.length = 0;
            for (var br = 1; br < 3; br++) {
              if (k - br >= 0) {
                for (var i = 0; i < sudoku[h][k - br][r].length; i++) {
                  za_izb.push(sudoku[h][k - br][r][i]);
                }
              }
            }
            izbor(za_izb, h, k, r);
          }
        }
      }
    }

    ubacivanje_u_jd();
    // kraj funkcije proveravam_hor

    function izbor(za_izb, h, k, r) {
      for (var i = 0; i < 3; i++) {
        for (var br = 1; br < 3; br++) {
          if (h - br >= 0) {
            for (var c = 0; c < 3; c++) {
              if (sudoku[h - br][k][c][i]) {
                nemoguci_brojevi.push(sudoku[h - br][k][c][i]);

              }
            }
          }
        }

        for (var ii = 0; ii < 3; ii++) {
          for (var jj = 0; jj < 3; jj++) {
            if (sudoku[h][k][ii][jj]) {
              ima_u_kvad.push(sudoku[h][k][ii][jj])
            }
          }
        }

        pravljenje_mugucih_brojeva();


        for (var iq = 0; iq < ima_u_kvad.length; iq++) {
          let iz = moguci_brojevi.indexOf(ima_u_kvad[iq]);
          if (iz >= 0) {
            moguci_brojevi.splice(iz, 1);
          }
        }
        if (nemoguci_brojevi.length > 0) {

          for (var iw = 0; iw < nemoguci_brojevi.length; iw++) {
            let iz = moguci_brojevi.indexOf(nemoguci_brojevi[iw]);
            if (iz >= 0) {
              moguci_brojevi.splice(iz, 1);
            }
          }

        }

        if (za_izb.length > 0) {
          for (var is = 0; is < za_izb.length; is++) {
            let iz = moguci_brojevi.indexOf(za_izb[is]);
            if (iz >= 0) {
              moguci_brojevi.splice(iz, 1);
            }
          }

        }



        let rndrnd = Math.floor(Math.random() * moguci_brojevi.length);

        if (moguci_brojevi[rndrnd]) {

          sudoku[h][k][r].push(moguci_brojevi[rndrnd]);

        }
        nemoguci_brojevi.length = 0;

        ima_u_kvad.length = 0;
      }

    }



    function ubacivanje_u_jd() {

      for (var hhh = 0; hhh < 3; hhh++) {
        for (var kkk = 0; kkk < 3; kkk++) {
          for (var rrr = 0; rrr < 3; rrr++) {
            for (var iiii = 0; iiii < 3; iiii++) {
              jd_niz.push(sudoku[hhh][kkk][rrr][iiii]);
            }

          }
        }
      }

      upisivanje_u_viz_sudoku();
    }


    function upisivanje_u_viz_sudoku() {

      for (var krug = 0; krug < jd_niz.length; krug++) {
        if (jd_niz[krug]) {
          brojim++;
        }
      }

      if (brojim == 81) {
        for (var i = 0; i < 81; i++) {
          $(gran_child[i]).text(jd_niz[i]);
        }
      } else {
        //console.log("nije bilo uslova za upis");
      }
    }
    popunjavanje_kvadrata(sudoku);
    //console.log(sudoku);
  }

  function skrivanje() {
    //console.log("sad ću da sakrijem polja");
    for (var i = 0; i < 81; i++) {
      $(gran_child[i]).animate({
        opacity: '0.1'
      });
    }

    for (var skr = 0; skr < 81; skr = skr + 9) {
      for (var t = 0; t < 3; t++) {

        let zaskr = Math.floor(Math.random() * 9 + skr)
        //console.log("Slučajan broj je " + zaskr);
        $(gran_child[zaskr]).animate({
          opacity: '0.9'
        });
      }
    }
  }

  function cikl_kreir() {
    /*  for (var cik = 1; cik < 1501; cik++) {
        //console.log("Ciklus " + cik);
        kreiranje_sudoku();
        if (brojim==81) {
          //console.log("prekidam");
          console.log("Ciklus " + cik);
          break;
        }

        brojim = 0;

      }
    */
    kreiranje_sudoku();

    if (brojim !== 81) {
      brojim = 0;
      cikl_kreir()
    } else {
      skrivanje();
    }
    //skrivanje();

  }

  cikl_kreir();


});
