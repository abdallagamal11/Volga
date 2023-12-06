namespace Volga.Core.Utilities;

public static class DatetimeUtility
{
	public static DateTime FromUnixToDateTime(long timestamp)
	{
		return DateTimeOffset.FromUnixTimeSeconds(timestamp).DateTime;
	}

	public static long FromDateTimeToUnix(DateTime date)
	{
		return new DateTimeOffset(date).ToUnixTimeSeconds();
	}
}