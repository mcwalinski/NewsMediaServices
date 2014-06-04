var Sylvester = {
      precision: 1e-6
    };
    Sylvester.Matrix = function() {};

    Sylvester.Matrix.create = function(elements) {
      var M = new Sylvester.Matrix();
      return M.setElements(elements);
    };
    var $M = Sylvester.Matrix.create;

    Sylvester.Matrix.I = function(n) {
      var els = [], i = n, j;
      while (i--) { j = n;
        els[i] = [];
        while (j--) {
          els[i][j] = (i === j) ? 1 : 0;
        }
      }
      return Sylvester.Matrix.create(els);
    };

    Sylvester.Matrix.prototype = {
      e: function(i,j) {
        if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
        return this.elements[i-1][j-1];
      },

      row: function(i) {
        if (i > this.elements.length) { return null; }
        return Sylvester.Vector.create(this.elements[i-1]);
      },

      col: function(j) {
        if (this.elements.length === 0) { return null; }
        if (j > this.elements[0].length) { return null; }
        var col = [], n = this.elements.length;
        for (var i = 0; i < n; i++) { col.push(this.elements[i][j-1]); }
        return Sylvester.Vector.create(col);
      },

      dimensions: function() {
        var cols = (this.elements.length === 0) ? 0 : this.elements[0].length;
        return {rows: this.elements.length, cols: cols};
      },

      rows: function() {
        return this.elements.length;
      },

      cols: function() {
        if (this.elements.length === 0) { return 0; }
        return this.elements[0].length;
      },

      eql: function(matrix) {
        var M = matrix.elements || matrix;
        if (!M[0] || typeof(M[0][0]) === 'undefined') { M = Sylvester.Matrix.create(M).elements; }
        if (this.elements.length === 0 || M.length === 0) {
          return this.elements.length === M.length;
        }
        if (this.elements.length !== M.length) { return false; }
        if (this.elements[0].length !== M[0].length) { return false; }
        var i = this.elements.length, nj = this.elements[0].length, j;
        while (i--) { j = nj;
          while (j--) {
            if (Math.abs(this.elements[i][j] - M[i][j]) > Sylvester.precision) { return false; }
          }
        }
        return true;
      },

      map: function(fn, context) {
        if (this.elements.length === 0) { return Sylvester.Matrix.create([]); }
        var els = [], i = this.elements.length, nj = this.elements[0].length, j;
        while (i--) { j = nj;
          els[i] = [];
          while (j--) {
            els[i][j] = fn.call(context, this.elements[i][j], i + 1, j + 1);
          }
        }
        return Sylvester.Matrix.create(els);
      },

      isSameSizeAs: function(matrix) {
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = Sylvester.Matrix.create(M).elements; }
        if (this.elements.length === 0) { return M.length === 0; }
        return (this.elements.length === M.length &&
            this.elements[0].length === M[0].length);
      },

      add: function(matrix) {
        if (this.elements.length === 0) return this.map(function(x) { return x });
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = Sylvester.Matrix.create(M).elements; }
        if (!this.isSameSizeAs(M)) { return null; }
        return this.map(function(x, i, j) { return x + M[i-1][j-1]; });
      },
      
      indexOf: function(x) {
        if (this.elements.length === 0) { return null; }
        var index = null, ni = this.elements.length, i, nj = this.elements[0].length, j;
        for (i = 0; i < ni; i++) {
          for (j = 0; j < nj; j++) {
            if (this.elements[i][j] === x) { return {i: i+1, j: j+1}; }
          }
        }
        return null;
      },

      setElements: function(els) {
        var i, j, elements = els.elements || els;
        if (elements[0] && typeof(elements[0][0]) !== 'undefined') {
          i = elements.length;
          this.elements = [];
          while (i--) { j = elements[i].length;
            this.elements[i] = [];
            while (j--) {
              this.elements[i][j] = elements[i][j];
            }
          }
          return this;
        }
        var n = elements.length;
        this.elements = [];
        for (i = 0; i < n; i++) {
          this.elements.push([elements[i]]);
        }
        return this;
      }
    };

    Sylvester.Matrix.prototype.toUpperTriangular = Sylvester.Matrix.prototype.toRightTriangular;
    Sylvester.Matrix.prototype.det = Sylvester.Matrix.prototype.determinant;
    Sylvester.Matrix.prototype.tr = Sylvester.Matrix.prototype.trace;
    Sylvester.Matrix.prototype.rk = Sylvester.Matrix.prototype.rank;
    Sylvester.Matrix.prototype.inv = Sylvester.Matrix.prototype.inverse;
    Sylvester.Matrix.prototype.x = Sylvester.Matrix.prototype.multiply;