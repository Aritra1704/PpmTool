package io.arpaul.ppmtool.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.arpaul.ppmtool.common.Constants;
import io.arpaul.ppmtool.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {
	
	// Generate the token
	public String generateToken(Authentication authentication)  {
		User user = (User) authentication.getPrincipal();
		Date now = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime()+Constants.EXPIRATION_TIME);
		
		String userId = Long.toString(user.getId());
		
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", userId);
		claims.put("username", user.getUsername());
		claims.put("fullname", user.getFullName());
		
		return Jwts.builder()
				.setSubject(userId)
				.setClaims(claims)// add which ever you need to pass to token
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, Constants.SECRET)// signature algorithm
				.compact();
	}
	
	//Validate token
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(Constants.SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException ex) {
			System.out.println("Invalid JWT signature");
		} catch(MalformedJwtException ex) {
			System.out.println("Invalid JWT token");
		} catch (ExpiredJwtException e) {
			System.out.println("Expired JWT token");
		} catch (UnsupportedJwtException e) {
			System.out.println("Unsupported JWT token");
		} catch (IllegalArgumentException e) {
			System.out.println("Jwt claims strings is empty");
		}
		return false;
	}
	
	// Get user id from token
	
	public Long getUsedIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(Constants.SECRET).parseClaimsJws(token).getBody();
		String id = (String) claims.get("id");
		return Long.parseLong(id);
	}
}
