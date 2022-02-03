package io.arpaul.ppmtool.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.arpaul.ppmtool.domain.User;
import io.arpaul.ppmtool.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null) new UsernameNotFoundException("User not found");
		return user;
	}
	
	@Transactional // Use the spring framework one
	public User loadUserById(Long id) {
		Optional<User> user = userRepository.findById(id);
		if(user == null || user.isPresent()) new UsernameNotFoundException("User not found");
		System.out.println("User details >> " + user.get().toString());
		return user.get();
	}

}
