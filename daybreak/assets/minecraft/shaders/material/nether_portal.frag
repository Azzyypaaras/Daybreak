#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/math.glsl
#include frex:shaders/api/world.glsl

// holds our noise coordinates from the vertex shader
varying vec2 v_noise_uv;

// The name of this method is special - Canvas will call it for each fragment associated with your shader
void frx_startFragment(inout frx_FragmentData fragData) {
	// modify appearance where stone texture is lighter in color
		// get a time value we can use for animation
		float time = frx_renderSeconds();

		// use an animated noise function to mix a pastel blue/red color
		float color_weight = frx_noise2dt(vec2(fragData.spriteColor.r, fragData.spriteColor.g), time);

		// mix 'em up!
		vec4 highlight = mix(vec4(1, 0.560, 0.976, 1.0), vec4(0.960, 0.258, 0.682, 0.75), color_weight);

		// call animated noise function with noise coordinates scaled and shifted
		float blend_weight = frx_noise2dt(sin(v_noise_uv) * 4.0 - sin(time * 4) * 2, time * 4.0);
		blend_weight = (sin(time / 8.0) / 2.0) + 0.5;

		// mix with the stone texture colors
		fragData.spriteColor = mix(vec4(0.8, 0.258, 1, 0.6), highlight, blend_weight);

		// make these fragments fully lit
		fragData.emissivity = blend_weight * 2.0;
		fragData.ao = false;
		fragData.diffuse = true;
}
