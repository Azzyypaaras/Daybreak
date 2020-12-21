#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/math.glsl
#include frex:shaders/api/world.glsl

void frx_startFragment(inout frx_FragmentData fragData) {
	if(fragData.spriteColor.r > 0.48) {
		if(frx_isWorldTheNether()) {
		  float luminance = 0.2126*fragData.spriteColor.r + 0.7152*fragData.spriteColor.g + 0.0722*fragData.spriteColor.b;
		  vec4 fogColor = vec4(vec3(luminance), 1.0);;
		  fragData.spriteColor =  fogColor * (vec4(1, 0.250, 0.141, 1.0) * vec4(1.8));
		  fragData.emissivity = luminance * 3.0;
		}
		else {
    	float luminance = 0.2126*fragData.spriteColor.r + 0.7152*fragData.spriteColor.g + 0.0722*fragData.spriteColor.b;
    	fragData.emissivity = luminance;
    	fragData.diffuse = false;
			fragData.ao = false;
  		}
	}
}
