package com.portfolio.cms.config;

import org.springframework.context.annotation.*; 
import org.springframework.web.servlet.config.annotation.*; 
import org.springframework.beans.factory.annotation.Value; 
import java.nio.file.*;

@Configuration 
public class StaticConfig implements WebMvcConfigurer {
	
	@Value("${app.upload-dir}") String dir;
	
      	public void addResourceHandlers(ResourceHandlerRegistry r){
	    	r.addResourceHandler("/uploads/**")
		    .addResourceLocations("file:"+Paths.get(dir)
	    	.toAbsolutePath()+"/");
	    	
      	} 
      	
}
