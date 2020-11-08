
class SawToothOscillator
{
private:
  float mPhase = 0.;
  float mPhaseIncrement = 0.;

public:
  inline float Process(float frequencyHz, float sampleRate) 
  {
    mPhaseIncrement = frequencyHz * (1.f / sampleRate); 

    mPhase += mPhaseIncrement; 

    while (mPhase >= 1.f) 
      mPhase -= 1.f; 
    
    while (mPhase < 0.f) 
      mPhase += 1.f;

    return mPhase * 2.f - 1.f;
  }

  void Reset() 
  { 
    mPhase = 0.; 
  }
};