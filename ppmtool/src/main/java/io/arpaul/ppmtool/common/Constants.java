package io.arpaul.ppmtool.common;

public class Constants {
	public static class ProjectTaskStatus {
		public static String TO_DO = "TO_DO";
		public static String IN_PROGRESS = "IN_PROGRESS";
		public static String DONE = "DONE";
	}
	
	public static class ProjectTaskPriority {
		public static int LOW = 3;
		public static int MEDIUM = 2;
		public static int HIGH = 1;
		public static int NONE = 0;
	}

	public static final String SIGN_UP_URLS = "/api/users/**";
	public static final String H2_URL = "h2-console/**";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final long EXPIRATION_TIME = 300_000;
	public static final String SECRET = "SecretKeyToGenJWTs";
}
