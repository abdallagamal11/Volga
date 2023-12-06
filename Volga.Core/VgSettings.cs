namespace Volga.Core;

public static class VgSettings
{
	public static string AppName = "Volga";
	public static class User
	{
		public static int NormalTokenExpireMinutes = 180;
		public static int PersistentTokenExpireMinutes = 18000;
		public static int MaxFailedAccessAttempts = 5;
		public static int LockoutTimeSpanInMinutes = 15;
	}
}
