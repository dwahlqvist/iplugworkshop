
  var Module = typeof Module !== 'undefined' ? Module : {};
  
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
   var loadPackage = function(metadata) {
  
      var PACKAGE_PATH;
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof location !== 'undefined') {
        // worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      } else {
        throw 'using preloaded data can only be done on a web page or in a web worker';
      }
      var PACKAGE_NAME = 'svgs.data';
      var REMOTE_PACKAGE_BASE = 'svgs.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
    
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];
    
      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };
    
        var fetchedCallback = null;
        var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

        if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
          if (fetchedCallback) {
            fetchedCallback(data);
            fetchedCallback = null;
          } else {
            fetched = data;
          }
        }, handleError);
      
    function runWithFS() {
  
      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
  Module['FS_createPath']('/', 'resources', true, true);
Module['FS_createPath']('/resources', 'img', true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
  
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
          this.requests[this.name] = null;
        }
      };
  
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
          }
  
    
      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
          // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
    
            var files = metadata['files'];
            for (var i = 0; i < files.length; ++i) {
              DataRequest.prototype.requests[files[i].filename].onload();
            }
                Module['removeRunDependency']('datafile_svgs.data');

      };
      Module['addRunDependency']('datafile_svgs.data');
    
      if (!Module.preloadResults) Module.preloadResults = {};
    
        Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
        if (fetched) {
          processPackageData(fetched);
          fetched = null;
        } else {
          fetchedCallback = processPackageData;
        }
      
    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }
  
   }
   loadPackage({"files": [{"filename": "/resources/img/Rogan2PRed.svg", "start": 0, "end": 11650, "audio": 0}, {"filename": "/resources/img/Rogan1PGreen.svg", "start": 11650, "end": 23312, "audio": 0}, {"filename": "/resources/img/Rogan2PBlue.svg", "start": 23312, "end": 34980, "audio": 0}, {"filename": "/resources/img/BefacoBigKnob.svg", "start": 34980, "end": 38835, "audio": 0}, {"filename": "/resources/img/Rogan1PSBlue.svg", "start": 38835, "end": 50986, "audio": 0}, {"filename": "/resources/img/Rogan2PSRed.svg", "start": 50986, "end": 63129, "audio": 0}, {"filename": "/resources/img/Davies1900hLargeBlack.svg", "start": 63129, "end": 67571, "audio": 0}, {"filename": "/resources/img/Rogan1PWhite.svg", "start": 67571, "end": 79245, "audio": 0}, {"filename": "/resources/img/Rogan3PSGreen.svg", "start": 79245, "end": 91368, "audio": 0}, {"filename": "/resources/img/Rogan3PWhite.svg", "start": 91368, "end": 103031, "audio": 0}, {"filename": "/resources/img/BefacoTinyKnob.svg", "start": 103031, "end": 107013, "audio": 0}, {"filename": "/resources/img/Rogan5PSGray.svg", "start": 107013, "end": 119174, "audio": 0}, {"filename": "/resources/img/BefacoSlidePotHandle.svg", "start": 119174, "end": 119662, "audio": 0}, {"filename": "/resources/img/Rogan3PGreen.svg", "start": 119662, "end": 131322, "audio": 0}, {"filename": "/resources/img/Davies1900hLargeRed.svg", "start": 131322, "end": 135764, "audio": 0}, {"filename": "/resources/img/Rogan3PRed.svg", "start": 135764, "end": 147415, "audio": 0}, {"filename": "/resources/img/Rogan2PSBlue.svg", "start": 147415, "end": 159569, "audio": 0}, {"filename": "/resources/img/Rogan2PSWhite.svg", "start": 159569, "end": 171725, "audio": 0}, {"filename": "/resources/img/Rogan3PSRed.svg", "start": 171725, "end": 183853, "audio": 0}, {"filename": "/resources/img/Rogan3PSBlue.svg", "start": 183853, "end": 195995, "audio": 0}, {"filename": "/resources/img/Rogan1PSWhite.svg", "start": 195995, "end": 208147, "audio": 0}, {"filename": "/resources/img/BefacoSlidePot.svg", "start": 208147, "end": 210493, "audio": 0}, {"filename": "/resources/img/Rogan1PBlue.svg", "start": 210493, "end": 222169, "audio": 0}, {"filename": "/resources/img/Davies1900hWhite.svg", "start": 222169, "end": 226614, "audio": 0}, {"filename": "/resources/img/Rogan3PBlue.svg", "start": 226614, "end": 238281, "audio": 0}, {"filename": "/resources/img/Rogan3PSWhite.svg", "start": 238281, "end": 250425, "audio": 0}, {"filename": "/resources/img/Davies1900hRed.svg", "start": 250425, "end": 254867, "audio": 0}, {"filename": "/resources/img/Rogan2SGray.svg", "start": 254867, "end": 266677, "audio": 0}, {"filename": "/resources/img/SynthTechAlco.svg", "start": 266677, "end": 279785, "audio": 0}, {"filename": "/resources/img/Davies1900hBlack.svg", "start": 279785, "end": 284220, "audio": 0}, {"filename": "/resources/img/Rogan6PSWhite.svg", "start": 284220, "end": 296472, "audio": 0}, {"filename": "/resources/img/Rogan1PRed.svg", "start": 296472, "end": 308135, "audio": 0}, {"filename": "/resources/img/Davies1900hLargeWhite.svg", "start": 308135, "end": 312578, "audio": 0}, {"filename": "/resources/img/Rogan2PWhite.svg", "start": 312578, "end": 324237, "audio": 0}, {"filename": "/resources/img/Rogan2PSGreen.svg", "start": 324237, "end": 336371, "audio": 0}, {"filename": "/resources/img/Rogan1PSRed.svg", "start": 336371, "end": 348509, "audio": 0}, {"filename": "/resources/img/Rogan2PGreen.svg", "start": 348509, "end": 360161, "audio": 0}, {"filename": "/resources/img/Rogan1PSGreen.svg", "start": 360161, "end": 372303, "audio": 0}], "remote_package_size": 372303, "package_uuid": "92f7c2b8-995a-4760-b227-4823039ca1f6"});
  
  })();
  