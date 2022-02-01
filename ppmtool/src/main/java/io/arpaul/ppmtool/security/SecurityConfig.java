package io.arpaul.ppmtool.security;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntrypoint unAuthorizedHandler;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()// disable cross origin and cross site forgery
				.exceptionHandling().authenticationEntryPoint(unAuthorizedHandler)// add authentication handling
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// holds no state
				.and().headers().frameOptions().sameOrigin()// to enable H2 database
				.and().authorizeRequests()
				.antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html",
						"/**/*.css", "/**/*.js")
				.permitAll()// permit all above
				.antMatchers("/api/users/**").permitAll()// allows all endpoints for users
				.anyRequest().authenticated();// authenticate anything apart from mentioned above
	}

}
