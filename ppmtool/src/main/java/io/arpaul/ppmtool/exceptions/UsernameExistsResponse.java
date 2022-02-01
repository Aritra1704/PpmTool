package io.arpaul.ppmtool.exceptions;

public class UsernameExistsResponse {

	private String username;

	public UsernameExistsResponse(String username) {
		super();
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "UsernameExistsResponse [username=" + username + "]";
	}
}
