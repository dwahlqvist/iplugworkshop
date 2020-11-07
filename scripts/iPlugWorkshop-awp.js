/* Declares the iPlugWorkshop Audio Worklet Processor */

class iPlugWorkshop_AWP extends AudioWorkletGlobalScope.WAMProcessor
{
  constructor(options) {
    options = options || {}
    options.mod = AudioWorkletGlobalScope.WAM.iPlugWorkshop;
    super(options);
  }
}

registerProcessor("iPlugWorkshop", iPlugWorkshop_AWP);
